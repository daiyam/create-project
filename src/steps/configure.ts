import type { Answers, Configuration, CliOptions, Repository } from '../types.js';

import path from 'node:path';

export function configure(answers: Answers, options: CliOptions): Configuration {
	const { cwd, name, language, component, author, test, bundler } = answers;

	const artifacts = ['@daiyam/lang-js'];
	let root = path.join(cwd, name);
	let packageName = name;
	let repository: Repository | undefined;

	if(language === 'typescript') {
		artifacts.push('@daiyam/lang-ts');

		if(component === 'cli' || component === 'lib') {
			const npmArtifacts = ['@daiyam/npm', '@daiyam/npm-ts'];

			let repoName: string;

			if(component === 'lib') {
				repoName = `node-${name}`;

				npmArtifacts.push('@daiyam/npm-lib-ts');
			}
			else {
				repoName = name;

				npmArtifacts.push('@daiyam/npm-cli-ts');
			}

			root = path.join(cwd, repoName);

			if(author === 'daiyam') {
				npmArtifacts.unshift('@daiyam/npm-daiyam');

				root = root.replace('AUTHOR', author);

				packageName = `@daiyam/${name}`;
				repository = {
					owner: 'daiyam',
					name: repoName,
				};
			}
			else if(author === 'zokugun') {
				npmArtifacts.unshift('@daiyam/npm-zokugun');

				root = root.replace('AUTHOR', author);

				packageName = `@zokugun/${name}`;
				repository = {
					owner: 'zokugun',
					name: repoName,
				};
			}
			else {
				root = root.replace('/AUTHOR', '');
			}

			artifacts.push(...npmArtifacts);
		}
		else if(component === 'vsx') {
			const repoName = `vscode-${name}`;

			root = path.join(cwd, repoName);

			artifacts.push('@daiyam/vsx-ts');

			if(author === 'zokugun') {
				artifacts.push('@daiyam/vsx-zokugun');

				root = root.replace('AUTHOR', author);

				repository = {
					owner: 'zokugun',
					name: repoName,
				};
			}
			else {
				root = root.replace('/AUTHOR', '');
			}

			if(bundler === 'ncc') {
				artifacts.push('@daiyam/vsx-bundle-ncc');
			}
			else if(bundler === 'webpack') {
				artifacts.push('@daiyam/vsx-bundle-webpack');
			}
		}

		if(test === 'mocha') {
			artifacts.push('@daiyam/test-mocha-ts');
		}
		else if(test === 'vitest') {
			artifacts.push('@daiyam/test-vitest-ts');
		}
	}

	artifacts.push('@daiyam/gh-issuehub');

	return {
		answers,
		artifacts,
		packageName,
		install: options.install ?? true,
		minReleaseAge: options.minReleaseAge,
		repository,
		root,
	};
}
