export const ContactContent = () => (
	<div className="window-content-inner">
		<h2>Get in Touch</h2>
		<div className="contact-item">
			<div className="contact-icon" style={{ background: '#EBF5FB' }}>
				✉️
			</div>
			<div>
				<div style={{ fontWeight: 500 }}>Email</div>
				<a href="mailto:jamesw0462@gmail.com">jamesw0462@gmail.com</a>
			</div>
		</div>
		<div className="contact-item">
			<div className="contact-icon" style={{ background: '#E8F5E9' }}>
				💼
			</div>
			<div>
				<div style={{ fontWeight: 500 }}>LinkedIn</div>
				<a
					href="https://www.linkedin.com/in/james-wu/"
					target="_blank"
					rel="noopener noreferrer"
				>
					linkedin.com/in/james-wu
				</a>
			</div>
		</div>
		<div className="contact-item">
			<div className="contact-icon" style={{ background: '#F3E5F5' }}>
				🐙
			</div>
			<div>
				<div style={{ fontWeight: 500 }}>GitHub</div>
				<a
					href="https://github.com/jamesmwu"
					target="_blank"
					rel="noopener noreferrer"
				>
					github.com/jamesmwu
				</a>
			</div>
		</div>
	</div>
);
