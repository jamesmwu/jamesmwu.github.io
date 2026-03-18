import React, { useCallback, useRef } from 'react';

interface DesktopIconProps {
	id: string;
	label: string;
	iconType: 'folder' | 'file' | 'pdf';
	x: number;
	y: number;
	isSelected: boolean;
	onSelect: (id: string) => void;
	onOpen: (id: string) => void;
	onMove: (id: string, x: number, y: number) => void;
}

const FolderSVG = () => (
	<svg viewBox="0 0 56 48" width="56" height="48">
		<path
			d="M2 12C2 9 4 7 7 7H18L22 12H49C52 12 54 14 54 17V41C54 44 52 46 49 46H7C4 46 2 44 2 41Z"
			fill="#5AC8FA"
			stroke="#4AB0E8"
			strokeWidth="0.5"
		/>
		<path d="M2 12H54V18H2Z" fill="rgba(255,255,255,0.15)" />
	</svg>
);

const FileSVG = () => (
	<svg viewBox="0 0 44 56" width="44" height="56">
		<path
			d="M4 3C4 1.5 5.5 0 7 0H28L40 12V53C40 54.5 38.5 56 37 56H7C5.5 56 4 54.5 4 53Z"
			fill="white"
			stroke="#ccc"
			strokeWidth="1"
		/>
		<path
			d="M28 0L28 9C28 11 30 12 32 12L40 12"
			fill="#f0f0f0"
			stroke="#ccc"
			strokeWidth="0.5"
		/>
		<line x1="11" y1="22" x2="33" y2="22" stroke="#ddd" strokeWidth="1.5" />
		<line x1="11" y1="28" x2="33" y2="28" stroke="#ddd" strokeWidth="1.5" />
		<line x1="11" y1="34" x2="28" y2="34" stroke="#ddd" strokeWidth="1.5" />
		<line x1="11" y1="40" x2="31" y2="40" stroke="#ddd" strokeWidth="1.5" />
	</svg>
);

const PdfSVG = () => (
	<svg viewBox="0 0 44 56" width="44" height="56">
		<path
			d="M4 3C4 1.5 5.5 0 7 0H28L40 12V53C40 54.5 38.5 56 37 56H7C5.5 56 4 54.5 4 53Z"
			fill="white"
			stroke="#ccc"
			strokeWidth="1"
		/>
		<path
			d="M28 0L28 9C28 11 30 12 32 12L40 12"
			fill="#f0f0f0"
			stroke="#ccc"
			strokeWidth="0.5"
		/>
		<rect x="8" y="34" width="28" height="14" rx="2" fill="#E53935" />
		<text
			x="22"
			y="45"
			textAnchor="middle"
			fill="white"
			fontSize="9"
			fontWeight="bold"
			fontFamily="Arial, sans-serif"
		>
			PDF
		</text>
	</svg>
);

const ICON_MAP = {
	folder: FolderSVG,
	file: FileSVG,
	pdf: PdfSVG,
};

export const DesktopIcon: React.FC<DesktopIconProps> = ({
	id,
	label,
	iconType,
	x,
	y,
	isSelected,
	onSelect,
	onOpen,
	onMove,
}) => {
	const IconComponent = ICON_MAP[iconType];
	const touchStartRef = useRef({ x: 0, y: 0 });
	const touchMovedRef = useRef(false);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			const startMouseX = e.clientX;
			const startMouseY = e.clientY;
			const startX = x;
			const startY = y;
			let moved = false;

			const handleMouseMove = (e: MouseEvent) => {
				const dx = e.clientX - startMouseX;
				const dy = e.clientY - startMouseY;
				if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
					moved = true;
					onMove(id, startX + dx, startY + dy);
				}
			};

			const handleMouseUp = () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
				document.body.style.userSelect = '';
				if (!moved) {
					onSelect(id);
				}
			};

			document.body.style.userSelect = 'none';
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		},
		[id, x, y, onMove, onSelect]
	);

	const handleDoubleClick = useCallback(() => {
		onOpen(id);
	}, [id, onOpen]);

	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		const touch = e.touches[0];
		touchStartRef.current = { x: touch.clientX, y: touch.clientY };
		touchMovedRef.current = false;
	}, []);

	const handleTouchMove = useCallback((e: React.TouchEvent) => {
		const touch = e.touches[0];
		const dx = touch.clientX - touchStartRef.current.x;
		const dy = touch.clientY - touchStartRef.current.y;
		if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
			touchMovedRef.current = true;
		}
	}, []);

	const handleTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			if (!touchMovedRef.current) {
				e.preventDefault();
				onOpen(id);
			}
		},
		[id, onOpen]
	);

	return (
		<div
			className={`desktop-icon${isSelected ? ' selected' : ''}`}
			style={{ left: x, top: y }}
			onMouseDown={handleMouseDown}
			onDoubleClick={handleDoubleClick}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div className="desktop-icon-image">
				<IconComponent />
			</div>
			<span className="desktop-icon-label">{label}</span>
		</div>
	);
};
