export type Document = {
	body: string;
	created: string;
	docHistory: string;
	lastEditBy: string;
	lastEditedBy: string;
	markup: string;
	subtitle: string;
	tags: Array<string>;
	title: string;
	updated: string;
	url: string;
	_id: string;
};

export type DocumentWithoutId = {
	body: string;
	created: string;
	docHistory: string;
	lastEditBy: string;
	lastEditedBy: string;
	markup: string;
	subtitle: string;
	tags: Array<string>;
	title: string;
	updated: string;
	url: string;
};