import { Command } from 'commander';
import pkg from '../package.json' with { type: 'json' };
import { run } from './run.js';

const program = new Command();

program
	.version(pkg.version, '-v, --version')
	.description(pkg.description)
	.option('--cwd <cwd>', 'generate project to <cwd>', '')
	.action(run)
	.parse();
