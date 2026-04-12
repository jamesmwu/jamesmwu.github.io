const PROJECTS = [
	{
		name: 'Retro Llama',
		description: 'easily create and share team retrospectives',
		url: 'https://llama-retro.netlify.app/',
	},
	{
		name: 'Haven',
		description: 'generate privacy and cookie policies, then embed them',
		url: 'http://swehaven.com/',
	},
	{
		name: 'Blackjack Trainer',
		description: 'free, offline blackjack strategy practice with good UI',
		url: 'http://learn-blackjack.com/',
	},
	{
		name: 'SWE Job Alert',
		description: 'get emails the moment new SWE jobs are posted',
		url: 'https://swe-job-alert.netlify.app/',
	},
	{
		name: '888 Career Prep',
		description: 'support for students interested in SWE and Pre-med',
		url: 'https://888careerprep.netlify.app/',
	},
];

export default function Projects() {
	return (
		<section className='py-8'>
			<h4 className='font-mono mb-4 text-sm font-semibold uppercase tracking-widest text-black'>
				Projects
			</h4>
			<ul className='space-y-2 text-sm font-mono'>
				{PROJECTS.map((project) => (
					<li key={project.name}>
						<a
							href={project.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							{project.name}
						</a>{' '}
						<span className='text-muted'>&mdash; {project.description}</span>
					</li>
				))}
			</ul>
			<p className='mt-8 text-sm leading-relaxed text-muted'>
				... and many more which are now defunct! some notable ones include a
				Taiwanese dictionary app "Taigi" with 5000+ downloads and a content
				moderation bot "Halberd" for a 2k+ member Discord server.
			</p>
		</section>
	);
}
