import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SnippetProps {
	title: string;
	children: React.ReactNode;
}

export function Snippet({ title, children }: SnippetProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className="my-2 overflow-hidden rounded-md border border-border bg-background">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className={cn(
					'flex w-full cursor-pointer items-center justify-between border-0 bg-background px-4 py-3 text-left',
					'font-mono text-xs font-medium tracking-wide text-inherit',
					'transition-colors hover:bg-gray-50',
					'outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-inset'
				)}
			>
				<code>{title}</code>
				<span className="text-muted text-xs">
					{open ? 'CLOSE' : 'OPEN'}
				</span>
			</button>
			{open && (
				<div className="border-t border-border bg-background px-4 py-4 text-sm leading-relaxed">
					{children}
				</div>
			)}
		</div>
	);
}
