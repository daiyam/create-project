import process from 'node:process';
import logger from '@zokugun/cli-utils/logger';
import { execa, ExecaError } from 'execa';
import { cleanup } from './steps/cleanup.js';
import { configure } from './steps/configure.js';
import { confirm } from './steps/confirm.js';
import { installArtifacts } from './steps/install-artifacts.js';
import { installGit } from './steps/install-git.js';
import { installManager } from './steps/install-manager.js';
import { prompts } from './steps/prompts.js';
import { setupRepo } from './steps/setup-repo.js';
import { writePackage } from './steps/write-package.js';
import { type CliOptions } from './types.js';

const { EDITOR } = process.env;

export async function run(options: CliOptions): Promise<void> {
	try {
		logger.begin();

		const answers = await prompts(options);
		const config = configure(answers);

		await confirm(config);

		await cleanup(config);

		logger.info('Creating project...');

		await writePackage(config);

		await installGit(config);

		logger.info('Installing packages...');

		await installArtifacts(config);

		if(answers.setupRepo && config.repository) {
			logger.info('Setup repository...');

			await setupRepo(config);

			logger.newLine();
		}

		logger.info('Installing dependencies...');

		await installManager(config);

		if(answers.editor) {
			await execa(EDITOR!, [config.root]);
		}

		logger.finish();
	}
	catch (error) {
		logger.error('Error!');

		if(error instanceof ExecaError) {
			console.log(error.message);
		}
	}
}
