export interface Dream {
	id: string;
	date: string;
	title?: string;
	content: string;
}

export interface DreamsData {
	dreams: Dream[];
}
