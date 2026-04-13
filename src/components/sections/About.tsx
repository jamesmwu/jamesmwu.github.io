import type { ReactNode } from 'react';

import { Snippet } from '@/components/Snippet';

const OTHER_ACHIEVEMENTS = [
	{
		label: 'ACM Hack',
		url: 'https://hack.uclaacm.com/',
		description:
			'president emeritus — our org teaches fullstack development to 2000+ students.',
	},
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
			'California All-State Symphony Orchestra; 1st place with the DBHS Symphony Orchestra at the National Orchestra Cup.',
	},
];

const FUN_FACTS: ReactNode[] = [
	<>
		i've met former attorney general{' '}
		<a
			href='https://en.wikipedia.org/wiki/Loretta_Lynch'
			target='_blank'
			rel='noopener noreferrer'
		>
			Loretta Lynch
		</a>
		, U.S. representative{' '}
		<a
			href='https://en.wikipedia.org/wiki/Young_Kim_(politician)'
			target='_blank'
			rel='noopener noreferrer'
		>
			Young Kim
		</a>
		, NBA player{' '}
		<a
			href='https://en.wikipedia.org/wiki/Steven_Adams'
			target='_blank'
			rel='noopener noreferrer'
		>
			Steve Adams
		</a>
		, Jeopardy champion{' '}
		<a
			href='https://en.wikipedia.org/wiki/Ken_Jennings'
			target='_blank'
			rel='noopener noreferrer'
		>
			Ken Jennings
		</a>
		, and the #1 Smash Bros player in the world{' '}
		<a
			href='https://en.wikipedia.org/wiki/MkLeo'
			target='_blank'
			rel='noopener noreferrer'
		>
			MkLeo
		</a>
	</>,
	'i gave a TEDx talk in high school',
	"i'm red-green colorblind",
	'i enjoy working out, playing sports, playing smash bros, reading, and drawing',
	"i've punched a coyote before",
];

export default function About() {
	return (
		<section className='py-8'>
			<h4 className='font-mono mb-4 text-sm font-semibold uppercase tracking-widest text-black'>
				A Bit More About Me
			</h4>

			<Snippet title="WHAT I'M INTERESTED IN">
				<p className='text-muted'>
					professionally, my goal is to make something that people find useful and delightful.
					while doing so, ideally i want the ability to exercise my creativity 
					with what gets built and how it gets built. i like learning the stories behind businesses, what 
					makes them successful, the challenges they've faced (both past and present), and how the founders
					evolved over time.
				</p>
			</Snippet>

			<Snippet title='SOME OTHER ACHIEVEMENTS'>
				<ul className='space-y-4 text-sm'>
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

			<Snippet title="FUN FACTS">
				<ul className='list-none space-y-3'>
					{FUN_FACTS.map((fact, i) => (
						<li
							key={i}
							className='border-l border-border pl-3 text-sm leading-relaxed text-muted'
						>
							{fact}
						</li>
					))}
				</ul>
			</Snippet>
		</section>
	);
}
