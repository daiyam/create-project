import { c, Invisible, logger } from '@zokugun/cli-utils';
import { type Configuration } from '../types.js';

export async function confirm(config: Configuration): Promise<void> {
	logger.newLine();
	logger.info(`${c.bold('Package Name:')} ${config.packageName}`);
	logger.info(`${c.bold('Repository:')} ${config.repository!.owner}/${config.repository!.name}`);
	logger.info(`${c.bold('Artifacts:')} ${config.artifacts.join(', ')}`);
	logger.info('Press ENTER to continue...');

	const prompt = new Invisible({
		name: 'continue',
	});

	await prompt.run();

	logger.newLine();
}
