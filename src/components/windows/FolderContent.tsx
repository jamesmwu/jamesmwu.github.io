import React from 'react';

interface FolderItem {
	id: string;
	label: string;
	iconType: 'file' | 'pdf';
	contentType: string;
}

const FOLDER_CONTENTS: Record<string, FolderItem[]> = {
	about: [
		{ id: 'bio', label: 'Bio.txt', iconType: 'file', contentType: 'about' },
		{
			id: 'funfacts',
			label: 'Fun Facts.txt',
			iconType: 'file',
			contentType: 'funfacts',
		},
		{
			id: 'contact',
			label: 'Contact.txt',
			iconType: 'file',
			contentType: 'contact',
		},
	],
};

const SmallFileSVG = () => (
	<svg viewBox="0 0 44 56" width="36" height="46">
		<path
			d="M4 3C4 1.5 5.5 0 7 0H28L40 12V53C40 54.5 38.5 56 37 56H7C5.5 56 4 54.5 4 53Z"
			fill="white"
			stroke="#c8c8c8"
			strokeWidth="1"
		/>
		<path
			d="M28 0L28 9C28 11 30 12 32 12L40 12"
			fill="#f0f0f0"
			stroke="#c8c8c8"
			strokeWidth="0.5"
		/>
		<line x1="12" y1="22" x2="32" y2="22" stroke="#ddd" strokeWidth="1.5" />
		<line x1="12" y1="28" x2="32" y2="28" stroke="#ddd" strokeWidth="1.5" />
		<line x1="12" y1="34" x2="26" y2="34" stroke="#ddd" strokeWidth="1.5" />
		<line x1="12" y1="40" x2="30" y2="40" stroke="#ddd" strokeWidth="1.5" />
	</svg>
);

const SmallPdfSVG = () => (
	<svg viewBox="0 0 44 56" width="36" height="46">
		<path
			d="M4 3C4 1.5 5.5 0 7 0H28L40 12V53C40 54.5 38.5 56 37 56H7C5.5 56 4 54.5 4 53Z"
			fill="white"
			stroke="#c8c8c8"
			strokeWidth="1"
		/>
		<path
			d="M28 0L28 9C28 11 30 12 32 12L40 12"
			fill="#f0f0f0"
			stroke="#c8c8c8"
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

const ICON_MAP = { file: SmallFileSVG, pdf: SmallPdfSVG };

interface FolderContentProps {
	folderId: string;
	onOpenFile: (contentType: string) => void;
}

export const FolderContent: React.FC<FolderContentProps> = ({
	folderId,
	onOpenFile,
}) => {
	const items = FOLDER_CONTENTS[folderId] || [];

	return (
		<div className="folder-window">
			<div className="folder-grid">
				{items.map((item) => {
					const Icon = ICON_MAP[item.iconType];
					return (
						<div
							key={item.id}
							className="folder-file"
							onClick={() => onOpenFile(item.contentType)}
						>
							<div className="folder-file-icon">
								<Icon />
							</div>
							<span className="folder-file-label">
								{item.label}
							</span>
						</div>
					);
				})}
			</div>
			<div className="folder-statusbar">
				{items.length} item{items.length !== 1 ? 's' : ''}
			</div>
		</div>
	);
};
