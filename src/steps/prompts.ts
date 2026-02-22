import process from 'node:process';
import enquirer, { type PromptOptions } from 'enquirer';
import { type CliOptions, type Answers } from '../types.js';
import { confirm } from '../utils/confirm.js';

const { EDITOR } = process.env;

export async function prompts(options: CliOptions): Promise<Answers> {
	const response1 = await enquirer.prompt<{ name: string; component: string }>([
		{
			type: 'select',
			name: 'component',
			message: 'Pick the type of the project',
			choices: ['cli', 'lib', 'vsx', 'skip'],
		},
		{
			type: 'input',
			name: 'name',
			required: true,
			message: 'What is the name of the project?',
		},
	]);

	if(response1.component === 'cli' || response1.component === 'lib') {
		const question2: PromptOptions[] = [
			{
				type: 'select',
				name: 'author',
				message: 'Pick the author',
				choices: ['daiyam', 'zokugun', 'skip'],
			},
			{
				type: 'select',
				name: 'test',
				message: 'Pick unit testing',
				choices: ['mocha', 'vitest', 'skip'],
			},
			confirm({
				name: 'setupRepo',
				message: 'Setup repository?',
			}),
		];

		if(EDITOR) {
			question2.push(confirm({
				name: 'editor',
				message: 'Open editor?',
			}));
		}

		const cwd = process.env[`NPM_CREATE_PROJECT_${response1.component.toUpperCase()}`];

		if(!cwd) {
			question2.unshift({
				type: 'input',
				name: 'cwd',
				message: 'Where to?',
				initial: options.cwd,
			});
		}

		const response2 = await enquirer.prompt<{ cwd?: string; test: string; editor?: boolean; setupRepo?: boolean }>(question2);

		return {
			...response1,
			cwd: cwd ?? '',
			...response2,
			language: 'typescript',
			manager: 'npm',
		};
	}
	else if(response1.component === 'vsx') {
		const question2: PromptOptions[] = [
			{
				type: 'select',
				name: 'author',
				message: 'Pick the author',
				choices: ['zokugun', 'skip'],
			},
			{
				type: 'select',
				name: 'test',
				message: 'Pick unit testing',
				choices: ['mocha', 'vitest', 'skip'],
			},
			{
				type: 'select',
				name: 'bundler',
				message: 'Pick the bundler to use',
				choices: ['skip', 'ncc'],
			},
			confirm({
				name: 'setupRepo',
				message: 'Setup GitHub repository?',
			}),
		];

		if(EDITOR) {
			question2.push(confirm({
				name: 'editor',
				message: 'Open editor?',
			}));
		}

		const cwd = process.env[`NPM_CREATE_PROJECT_${response1.component.toUpperCase()}`];

		if(!cwd) {
			question2.unshift({
				type: 'input',
				name: 'cwd',
				message: 'Where to?',
				initial: options.cwd,
			});
		}

		const response2 = await enquirer.prompt<{ cwd?: string; test: string; bundler: string; editor?: boolean; setupRepo?: boolean }>(question2);

		return {
			...response1,
			cwd: cwd ?? '',
			...response2,
			language: 'typescript',
			manager: 'npm',
		};
	}
	else {
		const question2: PromptOptions[] = [
			{
				type: 'input',
				name: 'cwd',
				message: 'Where to?',
				initial: options.cwd,
			},
			{
				type: 'select',
				name: 'language',
				message: 'Pick the language',
				choices: ['typescript', 'skip'],
			},
			{
				type: 'select',
				name: 'test',
				message: 'Pick unit testing',
				choices: ['mocha', 'vitest', 'skip'],
			},
			{
				type: 'select',
				name: 'manager',
				message: 'Pick the package manager',
				choices: ['npm', 'yarn'],
			},
		];

		if(EDITOR) {
			question2.push(confirm({
				name: 'editor',
				message: 'Open editor?',
			}));
		}

		const response2 = await enquirer.prompt<{ cwd: string; language: string; test: string; manager: string; editor?: boolean }>(question2);

		return { ...response1, ...response2 };
	}
}
