import { Snippet } from '@/components/Snippet';

const OTHER_ACHIEVEMENTS = [
	{
		label: 'ArtLessonsWithWendy',
		url: 'https://www.youtube.com/channel/UCX5_eJ_pz6r8_7cMND8nKsQ',
		description:
			'grew the channel to 1.5k subscribers and 110k+ views. my mom is an artist; i directed and edited art videos for her.',
	},
	{
		label: 'The Orchestra Cup',
		url: 'https://www.theorchestracup.com/',
		description:
			'california all-state symphony orchestra; 1st place with the DBHS symphony orchestra at the national orchestra cup.',
	},
	{
		label: 'ACM Hack',
		url: 'https://hack.uclaacm.com/',
		description:
			'president at UCLA — our org teaches fullstack development to 2000+ students.',
	},
];

export default function About() {
	return (
		<section className='py-8'>
			<h4 className='font-mono mb-4 text-sm font-semibold uppercase tracking-widest text-black'>
				A Bit More About Me
			</h4>

			<Snippet title="WHAT I'M INTERESTED IN">
				<p className="text-muted">
					i find work fulfilling. if you do it well, you make an end user happy,
					you make your team happy, and make money at the same time! (whether
					through salaried employment or your own entrepreneurial endeavors.) i
					have three aspirations for my professional life: to make something
					people want, to do the work well, and to enjoy it along the way.
				</p>
			</Snippet>

			<Snippet title='SOME OTHER ACHIEVEMENTS'>
				<ul className='space-y-4 text-sm font-mono'>
					{OTHER_ACHIEVEMENTS.map((item) => (
						<li key={item.label}>
							<a
								href={item.url}
								target='_blank'
								rel='noopener noreferrer'
							>
								{item.label}
							</a>{' '}
							<span className='text-muted'>&mdash; {item.description}</span>
						</li>
					))}
				</ul>
			</Snippet>
		</section>
	);
}
