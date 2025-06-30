import '../../styles.css';

const ascii = [
	'   __   ______   __    __   ______   ______       __     __   __  __    ',
	'  /\\ \\ /\\  __ \\ /\\ "-./  \\ /\\  ___\\ /\\  ___\\     /\\ \\  _ \\ \\ /\\ \\/\\ \\   ',
	' _\\_\\ \\\\ \\  __ \\\\ \\ \\-./\\ \\\\ \\  __\\ \\ \\___  \\    \\ \\ \\/ ".\\ \\\\ \\ \\_\\ \\  ',
	'/\\_____\\\\ \\_\\ \\_\\\\ \\_\\ \\ \\_\\\\ \\_____\\\\/\\_____\\    \\ \\__/".~\\_\\\\ \\_____\\ ',
	'\\/_____/ \\/_/\\/_/ \\/_/  \\/_/ \\/_____/ \\/_____/     \\/_/   \\/_/ \\/_____/ ',
	'                                                                        ',
].join('\n');

export const Banner = () => {
	return (
		<div>
			<div>Initializing terminal...</div>
			<pre style={{ color: 'var(--accent-secondary)' }}>{ascii}</pre>
			<div>
				<p style={{ marginBottom: '0px' }}>Welcome to James Wu's terminal.</p>
				<p style={{ marginBottom: '5px', marginTop: '0px' }}>
					Type <span className='cmd'>help</span> to see available commands.
				</p>
			</div>
		</div>
	);
};
