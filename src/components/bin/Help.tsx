import '../../styles.css';

export const Help = () => {
	return (
		<pre style={{ margin: '20px' }}>
			<span className='cmd'>about</span> About me <br />
			<span className='cmd'>banner</span> Display welcome banner <br />
			<span className='cmd'>clear</span> Clear terminal <br />
			{/* <span className='cmd'>experiences</span> Check out my experiences <br /> */}
			<span className='cmd'>funfact</span> Fun facts about me! <br />
			<span className='cmd'>help</span> Lists this blurb of commands <br />
			{/* <span className='cmd'>projects</span> Explore my projects <br /> */}
			<span className='cmd'>signout</span> Sign out and change user <br />
			<span className='cmd'>repo</span> Link to this site's repo <br />
			<span className='cmd'>theme</span> Change terminal color theme <br />
		</pre>
	);
};
