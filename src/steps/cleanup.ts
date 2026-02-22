import fse from '@zokugun/fs-extra-plus/async';
import enquirer from 'enquirer';
import trash from 'trash';
import { type Configuration } from '../types.js';
import { confirm } from '../utils/confirm.js';

export async function cleanup({ root }: Configuration): Promise<void> {
	const exists = await fse.pathExists(root);

	if(exists) {
		const response = await enquirer.prompt<{ remove: boolean }>(confirm({
			name: 'remove',
			message: 'The project is already existing. Should it be trashed?',
		}));

		if(response.remove) {
			await trash(root);
		}
	}
}
