export type Answers = {
	cwd: string;
	author?: string;
	bundler?: string;
	component: string;
	editor?: boolean;
	language: string;
	manager: string;
	name: string;
	test: string;
	setupRepo?: boolean;
};

export type Configuration = {
	packageName: string;
	root: string;
	artifacts: string[];
	answers: Answers;
	repository?: string;
};

export type CliOptions = {
	cwd?: string;
};
