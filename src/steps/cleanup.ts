import Enquirer from 'enquirer';
import fse from 'fs-extra';
import trash from 'trash';
import { type Configuration } from '../types.js';
import { confirm } from '../utils/confirm.js';

export async function cleanup({ root }: Configuration): Promise<void> {
	if(fse.existsSync(root)) {
		const response = await Enquirer.prompt<{ remove: boolean }>(confirm({
			name: 'remove',
			message: 'The project is already existing. Should it be trashed?',
		}));

		if(response.remove) {
			await trash(root);
		}
	}
}
