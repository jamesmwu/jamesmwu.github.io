import '../../styles.css';

export const Projects: React.FC = () => {
	const projects = [
		{
			name: 'cool-website',
			description: 'A slick portfolio site built with React and Three.js',
			url: 'https://example.com/cool-website',
		},
		{
			name: 'data-cruncher',
			description: 'CLI tool that turns messy CSVs into clean insights',
			url: 'https://example.com/data-cruncher',
		},
	];

	const openProject = (url: string) => {
		window.open(url, '_blank');
	};

	return (
		<div style={{ margin: '20px', width: '70%' }}>
			<p>Projects:</p>
			{projects.map((project) => (
				<div
					key={project.name}
					style={{ marginBottom: '10px' }}
				>
					<span
						className='cmd'
						style={{ cursor: 'pointer' }}
						onClick={() => openProject(project.url)}
					>
						{project.name}
					</span>
					<div
						style={{
							marginLeft: '20px',
							fontSize: '14px',
							color: 'var(--text-secondary)',
						}}
					>
						{project.description}
					</div>
				</div>
			))}
			<p style={{ marginTop: '20px', fontSize: '14px' }}>
				Click a project name to learn more (opens in a new tab).
			</p>
		</div>
	);
};
