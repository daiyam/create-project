import process from 'node:process';
import c from 'ansi-colors';
import { execa, ExecaError } from 'execa';
import logUpdate from 'log-update';
import { cleanup } from './steps/cleanup.js';
import { configure } from './steps/configure.js';
import { installArtifacts } from './steps/install-artifacts.js';
import { installGit } from './steps/install-git.js';
import { installManager } from './steps/install-manager.js';
import { prompts } from './steps/prompts.js';
import { setupRepo } from './steps/setup-repo.js';
import { writePackage } from './steps/write-package.js';
import { type CliOptions } from './types.js';
import * as logger from './utils/logger.js';

const EDITOR = process.env.EDITOR;

export async function run(options: CliOptions): Promise<void> {
	let loading: undefined | ReturnType<typeof setInterval>;

	try {
		const start = Date.now();
		const answers = await prompts(options);
		const config = configure(answers);

		await cleanup(config);

		logger.log('Creating project...');

		await writePackage(config);

		await installGit(config);

		logger.log('Installing packages...');

		await installArtifacts(config);

		logger.log('Installing dependencies...');

		await installManager(config);

		if(answers.setupRepo && config.repository) {
			logger.log('Setup repository...');

			await setupRepo(config);

			logger.newLine();
		}

		if(answers.editor) {
			await execa(EDITOR!, [config.root]);
		}

		clearInterval(loading);

		const duration = Math.ceil((Date.now() - start) / 1000);

		logger.finish(duration);
	}
	catch (error) {
		clearInterval(loading);

		logUpdate(`${c.red(c.symbols.cross)} ${c.bold('Error!')}`);

		if(error instanceof ExecaError) {
			console.log(error.message);
		}
	}
}
