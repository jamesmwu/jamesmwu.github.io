import '../../styles.css';

interface ThemeProps {
	onThemeChange: (theme: string) => void;
	currentTheme: string;
}

export const Theme: React.FC<ThemeProps> = ({
	onThemeChange,
	currentTheme,
}) => {
	const themes = [
		{
			name: 'good-vibes',
			description: 'The classic vibes (default)',
		},
		{ name: 'noctis-lux', description: 'My choice of code editor theme' },
		{ name: 'snoopy', description: 'Big fan of Peanuts' },
		{ name: 'ucla', description: 'Go Bruins!' },
		{ name: 'vanta', description: 'In honor of my first post-grad job' },
	];

	const handleThemeChange = (themeName: string) => {
		onThemeChange(themeName);
	};

	return (
		<div style={{ margin: '20px', width: '70%' }}>
			<p>Available themes:</p>
			{themes.map((theme) => (
				<div
					key={theme.name}
					style={{ marginBottom: '10px' }}
				>
					<span
						className='cmd'
						style={{ cursor: 'pointer' }}
						onClick={() => handleThemeChange(theme.name)}
					>
						{theme.name}
					</span>
					{theme.name === currentTheme && (
						<span
							style={{ color: 'var(--accent-primary)', marginLeft: '10px' }}
						>
							← current
						</span>
					)}
					<div
						style={{
							marginLeft: '20px',
							fontSize: '14px',
							color: 'var(--text-secondary)',
						}}
					>
						{theme.description}
					</div>
				</div>
			))}
			<p style={{ marginTop: '20px', fontSize: '14px' }}>
				Click on a theme name to apply it. Your choice will be saved for future
				visits.
			</p>
		</div>
	);
};
