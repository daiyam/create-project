import process from 'node:process';
import logger from '@zokugun/cli-utils/logger';
import { cleanup } from './steps/cleanup.js';
import { configure } from './steps/configure.js';
import { confirm } from './steps/confirm.js';
import { installArtifacts } from './steps/install-artifacts.js';
import { installGit } from './steps/install-git.js';
import { installManager } from './steps/install-manager.js';
import { prompts } from './steps/prompts.js';
import { setupGit } from './steps/setup-git.js';
import { setupRepo } from './steps/setup-repo.js';
import { writePackage } from './steps/write-package.js';
import { type CliOptions } from './types.js';
import { exec } from './utils/exec.js';

const { EDITOR } = process.env;

export async function run(options: CliOptions): Promise<void> {
	logger.begin();

	const answers = await prompts(options);
	const config = configure(answers);

	await confirm(config);

	await cleanup(config);

	logger.info('Creating project...');

	await writePackage(config);

	const gitResult = await installGit(config);
	if(gitResult.fails) {
		logger.fatal(gitResult.error.message);
	}

	logger.info('Installing packages...');

	const artifactResult = await installArtifacts(config);
	if(artifactResult.fails) {
		logger.fatal(artifactResult.error.message);
	}

	if(answers.setupGit && config.repository) {
		logger.info('Setup .git...');

		const result = await setupGit(config);
		if(result.fails) {
			logger.fatal(result.error.message);
		}

		logger.newLine();
	}

	if(answers.setupRepo && config.repository) {
		logger.info('Setup GitHub repository...');

		const result = await setupRepo(config);
		if(result.fails) {
			logger.fatal(result.error.message);
		}

		logger.newLine();
	}

	logger.info('Installing dependencies...');

	const managerResult = await installManager(config);
	if(managerResult.fails) {
		logger.fatal(managerResult.error.message);
	}

	if(answers.editor) {
		const result = await exec(EDITOR!, [config.root]);
		if(result.fails) {
			logger.fatal(result.error.message);
		}
	}

	logger.finish();
}
