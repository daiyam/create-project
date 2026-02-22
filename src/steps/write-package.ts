import path from 'node:path';
import fse from '@zokugun/fs-extra-plus/async';
import { type Configuration } from '../types.js';

export async function writePackage({ packageName, root }: Configuration): Promise<void> {
	const filepath = path.join(root, 'package.json');
	const exists = await fse.pathExists(root);

	if(!exists) {
		await fse.mkdirs(root);

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
