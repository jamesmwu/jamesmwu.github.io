import '../../styles.css';

export const Experiences: React.FC = () => {
	const experiences = [
		{
			name: 'ucla-intern',
			description: 'Software Engineering Intern at UCLA Research Lab (2022)',
			url: 'https://example.com/ucla-intern',
		},
		{
			name: 'vanta',
			description: 'Security Engineer @ Vanta (2023-present)',
			url: 'https://example.com/vanta',
		},
	];

	const openExperience = (url: string) => {
		window.open(url, '_blank');
	};

	return (
		<div style={{ margin: '20px', width: '70%' }}>
			<p>Experiences:</p>
			{experiences.map((exp) => (
				<div
					key={exp.name}
					style={{ marginBottom: '10px' }}
				>
					<span
						className='cmd'
						style={{ cursor: 'pointer' }}
						onClick={() => openExperience(exp.url)}
					>
						{exp.name}
					</span>
					<div
						style={{
							marginLeft: '20px',
							fontSize: '14px',
							color: 'var(--text-secondary)',
						}}
					>
						{exp.description}
					</div>
				</div>
			))}
			<p style={{ marginTop: '20px', fontSize: '14px' }}>
				Click an experience name to learn more (opens in a new tab).
			</p>
		</div>
	);
};
