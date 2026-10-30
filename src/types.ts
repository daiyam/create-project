export type Answers = {
	cwd: string;
	author?: string;
	bundler?: string;
	component: string;
	editor?: boolean;
	language: string;
	// manager: string;
	name: string;
	test: string;
	setupGit?: boolean;
	setupRepo?: boolean;
};

export type Configuration = {
	answers: Answers;
	artifacts: string[];
	install: boolean;
	minReleaseAge?: number;
	packageName: string;
	repository?: Repository;
	root: string;
};

export type CliOptions = {
	cwd?: string;
	install?: boolean;
	minReleaseAge?: number;
};

export type Repository = {
	owner: string;
	name: string;
};
