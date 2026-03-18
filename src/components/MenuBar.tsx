import { useState, useEffect, useRef } from 'react';

interface MenuItem {
	label: string;
	shortcut?: string;
	action?: () => void;
	disabled?: boolean;
	separator?: boolean;
}

interface MenuBarProps {
	activeApp: string;
	onOpenWindow: (contentType: string) => void;
	onCloseFocused: () => void;
	onMinimizeFocused: () => void;
	onMaximizeFocused: () => void;
	onCloseAll: () => void;
	hasFocusedWindow: boolean;
}

export const MenuBar: React.FC<MenuBarProps> = ({
	activeApp,
	onOpenWindow,
	onCloseFocused,
	onMinimizeFocused,
	onMaximizeFocused,
	onCloseAll,
	hasFocusedWindow,
}) => {
	const [time, setTime] = useState(new Date());
	const [openMenu, setOpenMenu] = useState<string | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 30000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (!openMenu) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setOpenMenu(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [openMenu]);

	const handleMenuClick = (menuId: string) => {
		setOpenMenu(openMenu === menuId ? null : menuId);
	};

	const handleMenuEnter = (menuId: string) => {
		if (openMenu !== null) setOpenMenu(menuId);
	};

	const handleItemClick = (item: MenuItem) => {
		if (item.disabled || !item.action) return;
		item.action();
		setOpenMenu(null);
	};

	const menus: Record<string, MenuItem[]> = {
		apple: [
			{
				label: 'About This Site',
				action: () => onOpenWindow('aboutsite'),
			},
			{ label: '', separator: true },
			{
				label: 'View Source Code',
				action: () => onOpenWindow('source'),
			},
		],
		file: [
			{
				label: 'About Me',
				action: () => onOpenWindow('folder-about'),
			},
			{ label: 'Resume', action: () => onOpenWindow('resume') },
			{ label: 'Source Code', action: () => onOpenWindow('source') },
			{ label: '', separator: true },
			{
				label: 'Close Window',
				shortcut: '⌘W',
				action: onCloseFocused,
				disabled: !hasFocusedWindow,
			},
		],
		edit: [
			{ label: 'Undo', shortcut: '⌘Z', disabled: true },
			{ label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
			{ label: '', separator: true },
			{ label: 'Cut', shortcut: '⌘X', disabled: true },
			{ label: 'Copy', shortcut: '⌘C', disabled: true },
			{ label: 'Paste', shortcut: '⌘V', disabled: true },
			{ label: 'Select All', shortcut: '⌘A', disabled: true },
		],
		view: [
			{ label: 'as Icons ✓', disabled: true },
			{ label: 'as List', disabled: true },
			{ label: '', separator: true },
			{ label: 'Sort by Name', disabled: true },
		],
		window: [
			{
				label: 'Minimize',
				shortcut: '⌘M',
				action: onMinimizeFocused,
				disabled: !hasFocusedWindow,
			},
			{
				label: 'Zoom',
				action: onMaximizeFocused,
				disabled: !hasFocusedWindow,
			},
			{ label: '', separator: true },
			{ label: 'Close All Windows', action: onCloseAll },
		],
		help: [
			{
				label: 'About James Wu',
				action: () => onOpenWindow('about'),
			},
			{
				label: 'Get in Touch',
				action: () => onOpenWindow('contact'),
			},
		],
	};

	const dateStr = time.toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	});
	const timeStr = time.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
	});

	const renderDropdown = (menuId: string) => {
		if (openMenu !== menuId) return null;
		const items = menus[menuId];
		if (!items) return null;
		return (
			<div className="menu-dropdown">
				{items.map((item, i) =>
					item.separator ? (
						<div key={i} className="menu-dropdown-separator" />
					) : (
						<div
							key={i}
							className={`menu-dropdown-item${item.disabled ? ' disabled' : ''}`}
							onClick={() => handleItemClick(item)}
						>
							<span>{item.label}</span>
							{item.shortcut && (
								<span className="menu-dropdown-shortcut">
									{item.shortcut}
								</span>
							)}
						</div>
					)
				)}
			</div>
		);
	};

	const menuEntries = [
		{ id: 'file', label: 'File' },
		{ id: 'edit', label: 'Edit' },
		{ id: 'view', label: 'View' },
		{ id: 'window', label: 'Window' },
		{ id: 'help', label: 'Help' },
	];

	return (
		<div className="menu-bar" ref={menuRef}>
			<div className="menu-bar-left">
				<div
					className="menu-bar-menu-item"
					onClick={() => handleMenuClick('apple')}
					onMouseEnter={() => handleMenuEnter('apple')}
				>
					<span className="menu-bar-apple">
						<svg
							viewBox="0 0 14 17"
							width="14"
							height="17"
							fill="currentColor"
						>
							<path d="M13.1 12.6c-.3.7-.5 1-.9 1.6-.6.8-1.3 1.9-2.2 1.9-.8 0-1-.5-2.1-.5s-1.4.5-2.2.5c-.9 0-1.6-1-2.2-1.8C1.5 11.6.9 8.5 2.3 6.5c.7-1 1.9-1.6 3.1-1.6 1 0 1.7.6 2.3.6.6 0 1.5-.6 2.6-.5.5 0 1.7.2 2.4 1.3-2.1 1.2-1.8 4.3.4 5.3zM9.5 3.3c.5-.6.8-1.5.7-2.3-.7 0-1.6.5-2.1 1.1-.4.5-.8 1.4-.7 2.3.8 0 1.6-.5 2.1-1.1z" />
						</svg>
					</span>
					{renderDropdown('apple')}
				</div>
				<div className="menu-bar-menu-item menu-bar-app-item">
					<span className="menu-bar-app">{activeApp}</span>
				</div>
				{menuEntries.map((entry) => (
					<div
						key={entry.id}
						className="menu-bar-menu-item"
						onClick={() => handleMenuClick(entry.id)}
						onMouseEnter={() => handleMenuEnter(entry.id)}
					>
						<span>{entry.label}</span>
						{renderDropdown(entry.id)}
					</div>
				))}
			</div>
			<div className="menu-bar-right">
				<span>{dateStr}</span>
				<span>{timeStr}</span>
			</div>
		</div>
	);
};
