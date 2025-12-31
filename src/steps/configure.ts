import path from 'node:path';
import { type Answers, type Configuration } from '../types.js';

export function configure(answers: Answers): Configuration {
	const { cwd, name, language, component, author, test, bundler, setupRepo } = answers;

	const artifacts = ['@daiyam/lang-js'];
	let root = path.join(cwd, name);
	let packageName = name;
	let repository: string | undefined;

	if(language === 'typescript') {
		artifacts.push('@daiyam/lang-ts');

		if(component === 'cli' || component === 'lib') {
			const repoName = component === 'lib' ? `node-${name}` : name;

			root = path.join(cwd, repoName);

			artifacts.push('@daiyam/npm', '@daiyam/npm-ts');

			if(author === 'daiyam') {
				artifacts.push('@daiyam/npm-daiyam');

				root = root.replace('AUTHOR', author);

				packageName = `@daiyam/${name}`;
				repository = `daiyam/${repoName}`;
			}
			else if(author === 'zokugun') {
				artifacts.push('@daiyam/npm-zokugun');

				root = root.replace('AUTHOR', author);

				packageName = `@zokugun/${name}`;
				repository = `zokugun/${repoName}`;
			}
			else {
				root = root.replace('/AUTHOR', '');
			}
		}
		else if(component === 'vsx') {
			const repoName = `vscode-${name}`;

			root = path.join(cwd, repoName);

			artifacts.push('@daiyam/vsx-ts');

			if(author === 'zokugun') {
				artifacts.push('@daiyam/vsx-zokugun');

				root = root.replace('AUTHOR', author);

				repository = `zokugun/${repoName}`;
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

	if(setupRepo) {
		artifacts.push('@daiyam/gh-issuehub');
	}

	return {
		root,
		artifacts,
		answers,
		packageName,
		repository,
	};
}
