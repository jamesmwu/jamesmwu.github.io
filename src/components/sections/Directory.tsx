const LINKS = [
	{ label: 'github', url: 'https://github.com/jamesmwu' },
	{ label: 'linkedin', url: 'https://www.linkedin.com/in/james-wu/' },
	{ label: 'email', url: 'mailto:jamesw0462@gmail.com' },
];

export default function Directory() {
	return (
		<section
			id='contact'
			className='py-8'
		>
			<h4 className='font-mono mb-4 text-sm font-semibold uppercase tracking-widest text-black'>
				Connect
			</h4>
			<ul className='space-y-1 text-sm font-mono'>
				{LINKS.map((link) => (
					<li key={link.label}>
						<a
							href={link.url}
							{...(link.url.startsWith('http') || link.url.startsWith('mailto')
								? { target: '_blank', rel: 'noopener noreferrer' }
								: {})}
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
