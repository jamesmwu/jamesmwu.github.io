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

	// onboarding: modes => loading -> askName -> ready
	type Mode = 'loading' | 'askName' | 'ready' | 'loggedOut';
	const [mode, setMode] = useState<Mode>('loading');
	const [username, setUsername] = useState<string>('guest');
	const [dotCount, setDotCount] = useState(0);

	const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

	// On mount: check for stored username + theme
	useEffect(() => {
		const savedTheme = localStorage.getItem('terminal-theme');
		if (savedTheme) {
			setCurrentTheme(savedTheme);
			document.documentElement.setAttribute('data-theme', savedTheme);
		}

		const storedName = localStorage.getItem('terminal-username');
		if (storedName) {
			setUsername(storedName);
			setMode('ready');
			// show banner immediately
			setHistoryItems([
				{ type: 'command', commandInput: 'banner', id: commandCounter++ },
			]);
		} else {
			// begin loading animation
			setMode('loading');
		}
	}, []);

	// Handle loading dot animation
	useEffect(() => {
		if (mode !== 'loading') return;
		const interval = setInterval(() => {
			setDotCount((prev) => {
				if (prev >= 3) {
					clearInterval(interval);
					// after short delay transition to askName
					setTimeout(() => {
						setMode('askName');
					}, 400);
					return prev;
				}
				return prev + 1;
			});
		}, 650);
		return () => clearInterval(interval);
	}, [mode]);

	// Callback function to update theme - memoized to prevent unnecessary re-renders
	const handleThemeChange = useCallback((theme: string) => {
		setCurrentTheme(theme);
		localStorage.setItem('terminal-theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}, []);

	// Handle non-text terminal inputs (arrows, enter, CMD+K, etc)
	const inputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		// Name input mode
		if (mode === 'askName') {
			if (event.key === 'Enter') {
				const nameEntered = (boxValue.trim() || 'guest').replace(/\s+/g, '-');
				setUsername(nameEntered);
				localStorage.setItem('terminal-username', nameEntered);

				// Create initial history with ssh command and banner
				const initHistory: HistoryItem[] = [
					{ type: 'prompt', content: `ssh ${nameEntered}@jameswu.dev` },
					{ type: 'command', commandInput: 'banner', id: commandCounter++ },
				];
				setHistoryItems(initHistory);
				setBoxValue('');
				setCommandHistory([]);
				setMode('ready');
			}
			return;
		}

		if (mode !== 'ready') return;

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
			// Handle signout before proceeding
			if (boxValue.trim().toLowerCase() === 'signout') {
				localStorage.removeItem('terminal-username');
				setUsername('guest');
				setBoxValue('');
				setCommandHistory([]);
				setMode('loggedOut');
				return;
			}

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

	if (mode === 'loading') {
		return (
			<div className='App'>
				<div className='terminal-container'>
					<div>Initializing{'.'.repeat(dotCount)}</div>
				</div>
			</div>
		);
	}

	if (mode === 'loggedOut') {
		return (
			<div className='App'>
				<div className='terminal-container'>
					<div>Successfully logged out. Thanks for visiting!</div>
				</div>
			</div>
		);
	}

	if (mode === 'askName') {
		return (
			<div
				className='App'
				onClick={inputFocus}
			>
				<div className='terminal-container'>
					<div>Please enter your name:</div>
					<input
						autoFocus
						ref={inputRef}
						className='text-field'
						type='text'
						value={boxValue}
						onKeyDown={inputHandler}
						onChange={(e) => setBoxValue(e.target.value)}
					/>
				</div>
			</div>
		);
	}

	// mode === 'ready'
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
								<span style={{ color: 'var(--accent-tertiary)' }}>
									{username}
								</span>
								@
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
				<div
					style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}
				>
					<span style={{ color: 'var(--accent-tertiary)' }}>{username}</span>@
					<span style={{ color: 'var(--accent-secondary)' }}>jameswu.dev</span>
					:~${' '}
					<input
						autoFocus
						ref={inputRef}
						className='text-field'
						type='text'
						style={{ flex: 1, width: 'auto', marginLeft: '8px' }}
						value={boxValue}
						onKeyDown={inputHandler}
						onChange={(event) => {
							setBoxValue(event.target.value);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
