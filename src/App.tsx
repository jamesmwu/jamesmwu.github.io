import React, { useRef, useEffect, useState, useCallback } from 'react';
import './styles.css';
import { Command } from './components/Command';

// For command history (up/down arrows)
let historyLocation = -1;

/**
 * Unique ID for each command (not for prompts)
 * This is used to prevent unnecessary component re-renders
 */
let commandCounter = 0;

/**
 * Prompt: shows the guest@jameswu.dev:~${user input}
 * Command: shows the output of the user's command
 *
 * This allows separation of Command component rendering
 * and the line with the user inputs, so we can do some
 * more dynamic live updates within command outputs.
 * (e.g theme change)
 */
interface HistoryItem {
	type: 'prompt' | 'command';
	content?: string;
	commandInput?: string;
	id?: number;
}

function App() {
	const [boxValue, setBoxValue] = useState('');
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [currentTheme, setCurrentTheme] = useState('good-vibes');
	const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
		{ type: 'command', commandInput: 'banner', id: commandCounter++ },
	]);

	// Get the theme the user last used
	useEffect(() => {
		const savedTheme = localStorage.getItem('terminal-theme');
		if (savedTheme) {
			setCurrentTheme(savedTheme);
			document.documentElement.setAttribute('data-theme', savedTheme);
		}
	}, []);

	// Callback function to update theme - memoized to prevent unnecessary re-renders
	const handleThemeChange = useCallback((theme: string) => {
		setCurrentTheme(theme);
		localStorage.setItem('terminal-theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}, []);

	// Handle non-text terminal inputs (arrows, enter, CMD+K, etc)
	const inputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowUp') {
			event.preventDefault();

			if (historyLocation !== -1) {
				if (historyLocation === commandHistory.length) {
					historyLocation--;
				}
				setBoxValue(commandHistory[historyLocation]);
				if (historyLocation !== 0) {
					historyLocation--;
				}
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (commandHistory.length - 1 === historyLocation) {
				historyLocation++;
				setBoxValue('');
			} else if (historyLocation !== commandHistory.length) {
				historyLocation++;
				setBoxValue(commandHistory[historyLocation]);
			}
		} else if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			setHistoryItems([]);
			setCommandHistory([]);
			setBoxValue('');
		} else if (event.key === 'Enter') {
			historyLocation = commandHistory.length;
			const newHistoryItems = [
				...historyItems,
				{ type: 'prompt' as const, content: boxValue },
				{
					type: 'command' as const,
					commandInput: boxValue,
					id: commandCounter++,
				},
			];

			const fullHistory = commandHistory.concat([boxValue]);
			if (boxValue === 'clear') {
				setHistoryItems([]);
			} else {
				setHistoryItems(newHistoryItems);
			}
			setCommandHistory(fullHistory);
			setBoxValue('');
		}
	};

	/*
	 * References for two purposes:
	 * - Always scroll to the bottom of the overflowed screen when commands are issued
	 * - Always focus on text input
	 */
	const inputRef = useRef<HTMLInputElement>(null);
	const inputFocus = () => {
		inputRef.current?.focus();
	};
	useEffect(() => inputRef.current?.scrollIntoView());

	return (
		<div
			className='App'
			onClick={inputFocus}
		>
			<div className='terminal-container'>
				{historyItems.map((item, index) => (
					<div
						key={
							item.type === 'command' ? `command-${item.id}` : `prompt-${index}`
						}
					>
						{item.type === 'prompt' ? (
							<div>
								<span style={{ color: 'var(--accent-tertiary)' }}>guest</span>@
								<span style={{ color: 'var(--accent-secondary)' }}>
									jameswu.dev
								</span>
								:~$ <span className='text-field'>{item.content}</span>
							</div>
						) : (
							<Command
								commandInput={item.commandInput || ''}
								onThemeChange={handleThemeChange}
								currentTheme={currentTheme}
							/>
						)}
					</div>
				))}
				<span style={{ color: 'var(--accent-tertiary)' }}>guest</span>@
				<span style={{ color: 'var(--accent-secondary)' }}>jameswu.dev</span>:~${' '}
				<input
					autoFocus
					ref={inputRef}
					className='text-field'
					type='text'
					value={boxValue}
					onKeyDown={inputHandler}
					onChange={(event) => {
						setBoxValue(event.target.value);
					}}
				/>
			</div>
		</div>
	);
}

export default App;
