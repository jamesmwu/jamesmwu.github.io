import React from 'react';
import { About } from './About';
import { Banner } from './Banner';
import { Help } from './Help';
import { Repo } from './Repo';
import { FunFact } from './FunFact';
import { Theme } from './Theme';
// import { Projects } from './Projects';
// import { Experiences } from './Experiences';
import { Signout } from './Signout';
import '../../styles.css';

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
		// case 'projects':
		// 	return <Projects />;
		// case 'experiences':
		// 	return <Experiences />;
		case 'signout':
			return <Signout />;
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
