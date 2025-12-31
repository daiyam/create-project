import path from 'node:path';
import fse from 'fs-extra';
import { type Configuration } from '../types.js';

export async function writePackage({ packageName, root }: Configuration): Promise<void> {
	const filepath = path.join(root, 'package.json');

	if(!await fse.exists(filepath)) {
		await fse.mkdirp(root);

		await fse.writeJSON(filepath, {
			name: packageName,
			version: '0.0.0',
			description: '',
			author: '',
			license: 'MIT',
			homepage: '',
			repository: '',
			bugs: '',
			main: 'index.js',
			scripts: {},
			keywords: [],
		}, { spaces: '\t' });
	}
}
