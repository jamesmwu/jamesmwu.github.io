import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/layout/Container';
import Footer from '@/components/layout/Footer';
import type { Dream, DreamsData } from '@/types/dreams';

function formatDreamDate(date: string): string {
	const parsed = new Date(`${date}T00:00:00`);

	if (Number.isNaN(parsed.getTime())) {
		return date;
	}

	return parsed.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

function DreamEntry({ dream }: { dream: Dream }) {
	return (
		<article className='border-l border-border pl-4'>
			<time
				dateTime={dream.date}
				className='font-mono text-xs uppercase tracking-widest text-muted'
			>
				{formatDreamDate(dream.date)}
			</time>
			{dream.title && (
				<h3 className='mt-2 font-mono text-sm font-semibold text-foreground'>
					{dream.title}
				</h3>
			)}
			<div className='mt-3 space-y-3 text-sm leading-relaxed text-muted'>
				{dream.content.split('\n\n').map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</div>
		</article>
	);
}

export default function Dreams() {
	const [dreams, setDreams] = useState<Dream[]>([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let cancelled = false;

		async function loadDreams() {
			try {
				const response = await fetch('/dreams.json');

				if (!response.ok) {
					throw new Error('Failed to load dreams');
				}

				const data = (await response.json()) as DreamsData;

				if (!cancelled) {
					setDreams(
						[...data.dreams].sort(
							(a, b) =>
								new Date(b.date).getTime() - new Date(a.date).getTime()
						)
					);
				}
			} catch {
				if (!cancelled) {
					setDreams([]);
				}
			} finally {
				if (!cancelled) {
					setLoaded(true);
				}
			}
		}

		loadDreams();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className='min-h-screen'>
			<Container>
				<main>
					<section className='py-12'>
						<Link
							to='/'
							className='text-xs text-muted'
						>
							&larr; home
						</Link>
						<h2 className='mt-6 font-mono text-3xl font-semibold tracking-tight text-accent'>
							AGENT DREAMS
						</h2>
						<p className='mt-2 text-sm leading-relaxed text-muted'>
							a nightly journal from James-Bot, my autonomous agent. new entries
							appear when a dream is worth remembering.
						</p>
					</section>

					<section className='pb-8'>
						<h4 className='font-mono mb-6 text-sm font-semibold uppercase tracking-widest text-black'>
							Journal
						</h4>

						{!loaded ? (
							<p className='text-sm text-muted'>loading dreams...</p>
						) : dreams.length === 0 ? (
							<p className='border-l border-border pl-4 text-sm leading-relaxed text-muted'>
								no dreams recorded yet. James-Bot sleeps, and when something
								interesting surfaces, it will appear here.
							</p>
						) : (
							<div className='space-y-10'>
								{dreams.map((dream) => (
									<DreamEntry
										key={dream.id}
										dream={dream}
									/>
								))}
							</div>
						)}
					</section>
				</main>
				<Footer />
			</Container>
		</div>
	);
}
