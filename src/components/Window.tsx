import React, { useCallback } from 'react';
import { AboutContent } from './windows/AboutContent';
import { FunFactsContent } from './windows/FunFactsContent';
import { ResumeContent } from './windows/ResumeContent';
import { ContactContent } from './windows/ContactContent';
import { SourceContent } from './windows/SourceContent';
import { AboutSiteContent } from './windows/AboutSiteContent';
import { FolderContent } from './windows/FolderContent';

interface WindowProps {
	id: string;
	title: string;
	contentType: string;
	x: number;
	y: number;
	width: number;
	height: number;
	zIndex: number;
	isMinimized: boolean;
	isMaximized: boolean;
	isFocused: boolean;
	onClose: (id: string) => void;
	onMinimize: (id: string) => void;
	onMaximize: (id: string) => void;
	onFocus: (id: string) => void;
	onMove: (id: string, x: number, y: number) => void;
	onOpenWindow?: (contentType: string) => void;
}

const CONTENT_MAP: Record<string, React.FC> = {
	about: AboutContent,
	funfacts: FunFactsContent,
	resume: ResumeContent,
	contact: ContactContent,
	source: SourceContent,
	aboutsite: AboutSiteContent,
};

export const Window: React.FC<WindowProps> = ({
	id,
	title,
	contentType,
	x,
	y,
	width,
	height,
	zIndex,
	isMaximized,
	isFocused,
	onClose,
	onMinimize,
	onMaximize,
	onFocus,
	onMove,
	onOpenWindow,
}) => {
	const handleTitleBarMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (isMaximized) return;
			e.preventDefault();

			const offsetX = e.clientX - x;
			const offsetY = e.clientY - y;

			const handleMouseMove = (e: MouseEvent) => {
				onMove(id, e.clientX - offsetX, e.clientY - offsetY);
			};

			const handleMouseUp = () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
				document.body.style.userSelect = '';
				document.body.style.cursor = '';
			};

			document.body.style.userSelect = 'none';
			document.body.style.cursor = 'grabbing';
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		},
		[id, x, y, isMaximized, onMove]
	);

	const isFolder = contentType.startsWith('folder-');
	const ContentComponent = CONTENT_MAP[contentType];

	const style: React.CSSProperties = isMaximized
		? { top: 0, left: 0, width: '100%', height: '100%', zIndex, borderRadius: 0 }
		: { top: y, left: x, width, height, zIndex };

	return (
		<div
			className={`window${isFocused ? ' focused' : ''}${isMaximized ? ' maximized' : ''}`}
			style={style}
			onMouseDown={() => onFocus(id)}
		>
			<div className="window-titlebar" onMouseDown={handleTitleBarMouseDown}>
				<div
					className="traffic-lights"
					onMouseDown={(e) => e.stopPropagation()}
				>
					<div className="traffic-light close" onClick={() => onClose(id)}>
						<span className="traffic-light-symbol">×</span>
					</div>
					<div className="traffic-light minimize" onClick={() => onMinimize(id)}>
						<span className="traffic-light-symbol">−</span>
					</div>
					<div className="traffic-light maximize" onClick={() => onMaximize(id)}>
						<span className="traffic-light-symbol">
							{isMaximized ? '−' : '+'}
						</span>
					</div>
				</div>
				<span className="window-title">
					{isFolder && (
						<span style={{ marginRight: 6 }}>📁</span>
					)}
					{title}
				</span>
			</div>
			<div className="window-content">
				{isFolder ? (
					<FolderContent
						folderId={contentType.replace('folder-', '')}
						onOpenFile={onOpenWindow!}
					/>
				) : (
					ContentComponent && <ContentComponent />
				)}
			</div>
		</div>
	);
};
