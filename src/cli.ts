import { Command } from '@zokugun/cli-utils/commander';
import pkg from '../package.json' with { type: 'json' };
import { run } from './run.js';

const program = new Command();

program
	.version(pkg.version, '-v, --version')
	.description(pkg.description)
	.option('--age, --min-release-age <hours>', 'minimum age in hours of artifacts to allow install', Number)
	.option('--cwd <cwd>', 'generate project to <cwd>', '')
	.option('--no-install', 'skip installation steps', true)
	.action(run)
	.parse();
