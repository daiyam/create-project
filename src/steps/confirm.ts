import c from 'ansi-colors';
import { type Configuration } from '../types.js';
import { Invisible } from '../utils/invisible.js';
import * as logger from '../utils/logger.js';

export async function confirm(config: Configuration): Promise<void> {
	logger.newLine();
	logger.log(`${c.bold('Package Name:')} ${config.packageName}`);
	logger.log(`${c.bold('Repository:')} ${config.repository}`);
	logger.log(`${c.bold('Artifacts:')} ${config.artifacts.join(', ')}`);
	logger.log('Press ENTER to continue...');

	const prompt = new Invisible({
		name: 'continue',
	});

	await prompt.run();

	logger.newLine();
}
