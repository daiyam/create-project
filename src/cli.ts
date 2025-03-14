import process from 'node:process';
import { Command } from '@commander-js/extra-typings';
import c from 'ansi-colors';
import pkg from '../package.json';
import { configure } from './utils/configure.js';
import { installArtifacts } from './utils/install-artifacts.js';
import { installGit } from './utils/install-git.js';
import { installManager } from './utils/install-manager.js';
import { prompts } from './utils/prompts.js';
import { writePackage } from './utils/write-package.js';

const EDITOR = process.env.EDITOR;

const program = new Command();

program
	.version(pkg.version, '-v, --version')
	.description(pkg.description)
	.option('--cwd <cwd>', 'generate project to <cwd>', '')
	.action(async (options) => {
		const { default: { dots } } = await import('cli-spinners');
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { execa, ExecaError } = await import('execa');
		const { default: logUpdate } = await import('log-update');
		const { default: trash } = await import('trash');

		let loading: undefined | ReturnType<typeof setInterval>;

		try {
			const start = Date.now();
			const answers = await prompts(options);
			const config = configure(answers);

			if(answers.remove) {
				await trash(config.root);
			}

			let index = 0;
			loading = setInterval(() => {
				const { frames } = dots;
				logUpdate(`${c.cyan(frames[index = ++index % frames.length])} Installing`);
			}, dots.interval);

			await writePackage(config);

			await installGit(config);

			await installArtifacts(config);

			await installManager(config);

			if(answers.editor) {
				await execa(EDITOR!, [config.root]);
			}

			clearInterval(loading);

			const duration = Math.ceil((Date.now() - start) / 1000);

			logUpdate(`🏁 ${c.bold('Done')} (in ${duration}s).`);
		}
		catch (error) {
			clearInterval(loading);

			logUpdate(`${c.red(c.symbols.cross)} ${c.bold('Error!')}`);

			if(error instanceof ExecaError) {
				console.log(error.message);
			}
		}
	})
	.parse();
