import { useState, useCallback } from 'react';
import './styles.css';
import { MenuBar } from './components/MenuBar';
import { Dock } from './components/Dock';
import { DesktopIcon } from './components/DesktopIcon';
import { Window } from './components/Window';

interface WindowState {
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
}

const DESKTOP_ITEMS = [
	{ id: 'folder-about', label: 'About Me', iconType: 'folder' as const },
	{ id: 'resume', label: 'Resume.pdf', iconType: 'pdf' as const },
	{ id: 'source', label: 'Source Code', iconType: 'file' as const },
];

const WINDOW_CONFIGS: Record<
	string,
	{ title: string; width: number; height: number; x: number; y: number }
> = {
	'folder-about': {
		title: 'About Me',
		width: 480,
		height: 360,
		x: 160,
		y: 80,
	},
	about: { title: 'Bio', width: 600, height: 440, x: 220, y: 70 },
	funfacts: { title: 'Fun Facts', width: 540, height: 420, x: 260, y: 100 },
	resume: { title: 'Resume', width: 560, height: 460, x: 260, y: 70 },
	contact: { title: 'Contact', width: 460, height: 360, x: 280, y: 120 },
	source: { title: 'Source Code', width: 500, height: 320, x: 320, y: 110 },
	aboutsite: {
		title: 'About This Site',
		width: 520,
		height: 380,
		x: 200,
		y: 90,
	},
};

function App() {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const [nextZIndex, setNextZIndex] = useState(1);
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
	const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
	const [iconPositions, setIconPositions] = useState<
		Record<string, { x: number; y: number }>
	>(() => {
		const positions: Record<string, { x: number; y: number }> = {};
		const startX =
			typeof window !== 'undefined' ? window.innerWidth - 120 : 1200;
		DESKTOP_ITEMS.forEach((item, index) => {
			positions[item.id] = { x: startX, y: 30 + index * 95 };
		});
		return positions;
	});

	const openWindow = useCallback(
		(contentType: string) => {
			setSelectedIcon(null);

			const existing = windows.find(
				(w) => w.contentType === contentType
			);
			if (existing) {
				setWindows((prev) =>
					prev.map((w) =>
						w.id === existing.id
							? { ...w, isMinimized: false, zIndex: nextZIndex }
							: w
					)
				);
				setFocusedWindowId(existing.id);
				setNextZIndex((prev) => prev + 1);
				return;
			}

			const config = WINDOW_CONFIGS[contentType];
			if (!config) return;

			const newId = `${contentType}-${Date.now()}`;
			setWindows((prev) => [
				...prev,
				{
					id: newId,
					title: config.title,
					contentType,
					x: config.x,
					y: config.y,
					width: config.width,
					height: config.height,
					zIndex: nextZIndex,
					isMinimized: false,
					isMaximized: false,
				},
			]);
			setFocusedWindowId(newId);
			setNextZIndex((prev) => prev + 1);
		},
		[windows, nextZIndex]
	);

	const closeWindow = useCallback((id: string) => {
		setWindows((prev) => prev.filter((w) => w.id !== id));
		setFocusedWindowId((prev) => (prev === id ? null : prev));
	}, []);

	const minimizeWindow = useCallback((id: string) => {
		setWindows((prev) =>
			prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
		);
		setFocusedWindowId((prev) => (prev === id ? null : prev));
	}, []);

	const maximizeWindow = useCallback((id: string) => {
		setWindows((prev) =>
			prev.map((w) =>
				w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
			)
		);
	}, []);

	const focusWindow = useCallback(
		(id: string) => {
			if (focusedWindowId === id) return;
			setWindows((prev) =>
				prev.map((w) =>
					w.id === id ? { ...w, zIndex: nextZIndex } : w
				)
			);
			setFocusedWindowId(id);
			setNextZIndex((prev) => prev + 1);
			setSelectedIcon(null);
		},
		[focusedWindowId, nextZIndex]
	);

	const moveWindow = useCallback((id: string, x: number, y: number) => {
		setWindows((prev) =>
			prev.map((w) => (w.id === id ? { ...w, x, y } : w))
		);
	}, []);

	const moveIcon = useCallback((id: string, x: number, y: number) => {
		setIconPositions((prev) => ({ ...prev, [id]: { x, y } }));
	}, []);

	const handleDesktopClick = useCallback(
		(e: React.MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.closest('.desktop-icon') || target.closest('.window'))
				return;
			setSelectedIcon(null);
			if (focusedWindowId) setFocusedWindowId(null);
		},
		[focusedWindowId]
	);

	const closeFocused = useCallback(() => {
		if (focusedWindowId) closeWindow(focusedWindowId);
	}, [focusedWindowId, closeWindow]);

	const minimizeFocused = useCallback(() => {
		if (focusedWindowId) minimizeWindow(focusedWindowId);
	}, [focusedWindowId, minimizeWindow]);

	const maximizeFocused = useCallback(() => {
		if (focusedWindowId) maximizeWindow(focusedWindowId);
	}, [focusedWindowId, maximizeWindow]);

	const closeAll = useCallback(() => {
		setWindows([]);
		setFocusedWindowId(null);
	}, []);

	const activeApp = (() => {
		if (!focusedWindowId) return 'Finder';
		const w = windows.find((w) => w.id === focusedWindowId);
		return w?.title || 'Finder';
	})();

	const openContentTypes = windows
		.filter((w) => !w.isMinimized)
		.map((w) => w.contentType);

	return (
		<div className="desktop">
			<MenuBar
				activeApp={activeApp}
				onOpenWindow={openWindow}
				onCloseFocused={closeFocused}
				onMinimizeFocused={minimizeFocused}
				onMaximizeFocused={maximizeFocused}
				onCloseAll={closeAll}
				hasFocusedWindow={focusedWindowId !== null}
			/>
			<div className="desktop-area" onClick={handleDesktopClick}>
				<div className="desktop-watermark">James Wu</div>
				<div className="desktop-icons-container">
					{DESKTOP_ITEMS.map((item) => (
						<DesktopIcon
							key={item.id}
							id={item.id}
							label={item.label}
							iconType={item.iconType}
							x={iconPositions[item.id]?.x ?? 0}
							y={iconPositions[item.id]?.y ?? 0}
							isSelected={selectedIcon === item.id}
							onSelect={setSelectedIcon}
							onOpen={() => openWindow(item.id)}
							onMove={moveIcon}
						/>
					))}
				</div>
				{windows.map(
					(w) =>
						!w.isMinimized && (
							<Window
								key={w.id}
								{...w}
								isFocused={focusedWindowId === w.id}
								onClose={closeWindow}
								onMinimize={minimizeWindow}
								onMaximize={maximizeWindow}
								onFocus={focusWindow}
								onMove={moveWindow}
								onOpenWindow={openWindow}
							/>
						)
				)}
			</div>
			<Dock
				openContentTypes={openContentTypes}
				onOpenWindow={openWindow}
			/>
		</div>
	);
}

export default App;
