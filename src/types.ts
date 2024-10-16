export interface UserType {
	code?:string;
	title: string;
	isDefault: boolean;
}
export interface NodeType {
	title: string;
	users: UserType[];
	key: string;
	children?: NodeType[];
	parentKey?: string;
	data?: any[];
	hierarchy: string[];
	accesses: string[];
}
export enum MenuAction {
	ADD,
	CUT,
	PASTE,
	DELETE
}
export enum TableAction {
	ISDEFAULT,
	DELETE
}