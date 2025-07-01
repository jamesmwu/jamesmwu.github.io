const facts = [
	'Some of my hobbies include working out, playing pickleball, and playing video games!',
	'One of the things I enjoy is learning how successful businesses came to be.',
	"I'm mildly red-green colorblind. Upon hearing this, most people point to the nearest red object and ask me what color it is.",
	'I enjoy public speaking!',
	'I have perfect pitch! (Which is great for violin!)',
	'At UCLA, I enjoyed taking late night walks around campus.',
];

export const FunFact = () => {
	const fact = facts[Math.floor(Math.random() * facts.length)];
	return <div>{fact}</div>;
};
