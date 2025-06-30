import React from 'react';
import { Ping } from './bin/Ping';
import { About } from './bin/About';
import { Banner } from './bin/Banner';
import { Help } from './bin/Help';
import { Repo } from './bin/Repo';
import { FunFact } from './bin/FunFact';
import { Theme } from './bin/Theme';
import '../styles.css';

interface CommandProps {
	commandInput: string;
	onThemeChange?: (theme: string) => void;
	currentTheme?: string;
}

const CommandComponent: React.FC<CommandProps> = ({
	commandInput,
	onThemeChange,
	currentTheme,
}) => {
	switch (commandInput.toLowerCase()) {
		case '':
			return <div />;
		case 'help':
			return <Help />;
		case 'ping':
			return <Ping />;
		case 'about':
			return <About />;
		case 'banner':
			return <Banner />;
		case 'repo':
			return <Repo />;
		case 'funfact':
			return <FunFact />;
		case 'theme':
			return (
				<Theme
					onThemeChange={onThemeChange!}
					currentTheme={currentTheme!}
				/>
			);
		default:
			return (
				<div className='command'>
					Command not found:{' '}
					<span style={{ color: 'var(--error)' }}>{commandInput}</span>. Run{' '}
					<span className='cmd'>help</span> for a list of available commands.
				</div>
			);
	}
};

// This prevents unnecessary re-renders (specifically when theme changes)
const arePropsEqual = (prevProps: CommandProps, nextProps: CommandProps) => {
	// Different command, so you have to render the new one
	if (prevProps.commandInput !== nextProps.commandInput) {
		return false;
	}

	// For theme command, check if currentTheme changed
	if (nextProps.commandInput.toLowerCase() === 'theme') {
		return prevProps.currentTheme === nextProps.currentTheme;
	}

	return true;
};

// Memoize the component with custom comparison
// Only re-render when props actually matter for this specific command
export const Command = React.memo(CommandComponent, arePropsEqual);
