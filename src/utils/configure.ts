import path from 'node:path';
import { type Answers, type Configuration } from '../types.js';

export function configure(answers: Answers): Configuration {
	const { cwd, name, language, component, author, test, bundler } = answers;
	const root = path.join(cwd, name);
	const artifacts = ['@daiyam/lang-js'];

	if(language === 'typescript') {
		artifacts.push('@daiyam/lang-ts');

		if(component === 'npm') {
			artifacts.push('@daiyam/npm-ts');

			if(author === 'daiyam') {
				artifacts.push('@daiyam/npm-daiyam');
			}
			else if(author === 'zokugun') {
				artifacts.push('@daiyam/npm-zokugun');
			}

			if(test) {
				artifacts.push('@daiyam/test-mocha-ts');
			}
		}
		else if(component === 'vsx') {
			artifacts.push('@daiyam/vsx-ts');

			if(author === 'zokugun') {
				artifacts.push('@daiyam/vsx-zokugun');
			}

			if(bundler === 'ncc') {
				artifacts.push('@daiyam/vsx-bundle-ncc');
			}
			else if(bundler === 'webpack') {
				artifacts.push('@daiyam/vsx-bundle-webpack');
			}

			if(test) {
				artifacts.push('@daiyam/test-mocha-ts');
			}
		}
	}

	return {
		root,
		artifacts,
		answers,
	};
}
