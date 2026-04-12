import { useState, useCallback } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import { Container } from '@/components/layout/Container';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Directory from '@/components/sections/Directory';

export default function App() {
	const [showIntro, setShowIntro] = useState(true);
	const [contentVisible, setContentVisible] = useState(false);

	const handleIntroComplete = useCallback(() => {
		setShowIntro(false);
		setContentVisible(true);
	}, []);

	return (
		<>
			{showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
			<div
				className={`min-h-screen transition-opacity duration-500 ${
					contentVisible ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<Container>
					<main>
						<Hero />
						<Experience />
						<Projects />
						<About />
						<Directory />
					</main>
					<Footer />
				</Container>
			</div>
		</>
	);
}
