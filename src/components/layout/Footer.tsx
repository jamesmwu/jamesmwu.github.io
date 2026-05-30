import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className='border-t border-border py-8'>
			<div className='grid grid-cols-3 items-center font-mono text-sm text-muted'>
				<span>&copy; {new Date().getFullYear()} James Wu</span>
				<Link
					to='/dreams'
					className='text-center transition-colors hover:text-foreground'
				>
					Agent Dreams
				</Link>
				<a
					href='#'
					className='text-right transition-colors hover:text-foreground'
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
