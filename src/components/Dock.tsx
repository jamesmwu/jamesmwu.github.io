import React from 'react';

interface DockProps {
	openContentTypes: string[];
	onOpenWindow: (contentType: string) => void;
}

const dockApps = [
	{
		id: 'folder-about',
		label: 'About Me',
		bg: 'linear-gradient(135deg, #42a5f5, #1565c0)',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width="28"
				height="28"
				fill="none"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
			>
				<circle cx="16" cy="11" r="5" />
				<path d="M6 28c0-6 4.5-11 10-11s10 5 10 11" />
			</svg>
		),
	},
	{
		id: 'funfacts',
		label: 'Fun Facts',
		bg: 'linear-gradient(135deg, #ffd54f, #f9a825)',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width="28"
				height="28"
				fill="none"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M16 4l2.5 6 6.5.5-5 4.5 1.5 6.5L16 18l-5.5 3.5L12 15l-5-4.5L13.5 10z" />
			</svg>
		),
	},
	{
		id: 'resume',
		label: 'Resume',
		bg: 'linear-gradient(135deg, #ef5350, #c62828)',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width="28"
				height="28"
				fill="none"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
			>
				<path d="M8 4h10l6 6v18H8V4z" />
				<path d="M18 4v6h6" />
				<line x1="12" y1="16" x2="20" y2="16" />
				<line x1="12" y1="20" x2="20" y2="20" />
				<line x1="12" y1="24" x2="17" y2="24" />
			</svg>
		),
	},
	{
		id: 'contact',
		label: 'Contact',
		bg: 'linear-gradient(135deg, #66bb6a, #2e7d32)',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width="28"
				height="28"
				fill="none"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="4" y="8" width="24" height="16" rx="2" />
				<path d="M4 8l12 10L28 8" />
			</svg>
		),
	},
	{
		id: 'source',
		label: 'Source Code',
		bg: 'linear-gradient(135deg, #546e7a, #263238)',
		icon: (
			<svg
				viewBox="0 0 32 32"
				width="28"
				height="28"
				fill="none"
				stroke="white"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="11,8 5,16 11,24" />
				<polyline points="21,8 27,16 21,24" />
				<line x1="18" y1="6" x2="14" y2="26" />
			</svg>
		),
	},
];

export const Dock: React.FC<DockProps> = ({
	openContentTypes,
	onOpenWindow,
}) => {
	return (
		<div className="dock-container">
			<div className="dock">
				{dockApps.map((app) => (
					<div
						key={app.id}
						className="dock-item"
						onClick={() => onOpenWindow(app.id)}
					>
						<div
							className="dock-icon"
							style={{ background: app.bg }}
						>
							{app.icon}
						</div>
						<span className="dock-tooltip">{app.label}</span>
						{openContentTypes.includes(app.id) && (
							<div className="dock-indicator" />
						)}
					</div>
				))}
			</div>
		</div>
	);
};
