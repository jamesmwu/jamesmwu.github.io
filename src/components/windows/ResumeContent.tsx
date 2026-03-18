export const ResumeContent = () => (
	<div className="window-content-inner">
		<div className="resume-header">
			<h2>Resume</h2>
			<a
				href="/JamesWu_Resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				className="resume-download-btn"
			>
				<svg
					viewBox="0 0 16 16"
					width="14"
					height="14"
					fill="currentColor"
				>
					<path d="M8 12l-4-4h2.5V2h3v6H12L8 12z" />
					<path d="M2 13h12v1H2z" />
				</svg>
				Open PDF
			</a>
		</div>
		<div className="resume-body">
			<h3>Education</h3>
			<p>
				<strong>UCLA</strong> — B.S. Computer Science
			</p>

			<h3>Experience</h3>
			<div className="resume-entry">
				<strong>Vanta</strong> — Software Engineer (Incoming)
			</div>
			<div className="resume-entry">
				<strong>Arista Networks</strong> — Software Engineer Intern
			</div>
			<div className="resume-entry">
				<strong>QA Wolf</strong> — Software Engineer
			</div>
			<div className="resume-entry">
				<strong>GrammaTech</strong> — Software Engineer Intern
			</div>
			<p
				style={{
					marginTop: 16,
					color: '#888',
					fontSize: 12,
					fontStyle: 'italic',
				}}
			>
				Click "Open PDF" above for the full resume.
			</p>
		</div>
	</div>
);
