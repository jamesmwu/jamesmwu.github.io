import { useState, useEffect } from 'react';
import config from '@/constants/config';

export default function IntroAnimation({
	onComplete,
}: {
	onComplete: () => void;
}) {
	const [fadeOut, setFadeOut] = useState(false);
	const name = config.SITE_NAME;

	useEffect(() => {
		const fadeTimer = setTimeout(() => {
			setFadeOut(true);
		}, config.INTRO_DURATION_MS);

		const completeTimer = setTimeout(() => {
			onComplete();
		}, config.INTRO_DURATION_MS + 600);

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(completeTimer);
		};
	}, [onComplete]);

	return (
		<div className={`intro-overlay ${fadeOut ? 'fade-out' : ''}`}>
			<div className="intro-text" aria-label={name}>
				{name.split('').map((char, i) => (
					<span
						key={i}
						className="char"
						style={{
							animationDelay: `${i * config.INTRO_CHAR_STAGGER_MS}ms`,
						}}
					>
						{char === ' ' ? '\u00A0' : char}
					</span>
				))}
			</div>
		</div>
	);
}
