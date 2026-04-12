export default function Footer() {
	return (
		<footer className="border-t border-border py-8">
			<div className="flex items-center justify-between font-mono text-sm text-muted">
				<span>&copy; {new Date().getFullYear()} James Wu</span>
				<a
					href="#"
					className="transition-colors hover:text-foreground"
					onClick={(e) => {
						e.preventDefault();
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}
				>
					&uarr; TOP
				</a>
			</div>
		</footer>
	);
}
