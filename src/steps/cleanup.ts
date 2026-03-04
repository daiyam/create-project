import { confirm, enquirer } from '@zokugun/cli-utils';
import fse from '@zokugun/fs-extra-plus/async';
import trash from 'trash';
import { type Configuration } from '../types.js';

export async function cleanup({ root }: Configuration): Promise<void> {
	const exists = await fse.isExisting(root);

	if(exists) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const response = await enquirer.prompt<{ remove: boolean }>(confirm({
			name: 'remove',
			message: 'The project is already existing. Should it be trashed?',
		}));

		if(response.remove) {
			await trash(root);
		}
	}
}
