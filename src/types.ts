export type Answers = {
	cwd: string;
	author?: string;
	bundler?: string;
	component: string;
	editor?: boolean;
	language: string;
	manager: string;
	name: string;
	test: boolean;
	remove?: boolean;
};

export type Configuration = {
	root: string;
	artifacts: string[];
	answers: Answers;
};
