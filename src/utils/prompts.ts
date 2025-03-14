import path from 'node:path';
import process from 'node:process';
import c from 'ansi-colors';
import enquirer, { type BooleanPromptOptions } from 'enquirer';
import fse from 'fs-extra';
import { type Answers } from '../types.js';

const EDITOR = process.env.EDITOR;

function confirm(data: { name: string; message: string }): BooleanPromptOptions {
	return {
		type: 'confirm',
		format(value) {
			return value ? c.cyan('Yes') : c.cyan('No');
		},
		...data,
	};
}

export async function prompts({ cwd }: { cwd: string }): Promise<Answers> {
	const response1 = await enquirer.prompt<{ cwd: string; name: string; component: string }>([
		{
			type: 'input',
			name: 'cwd',
			message: 'Where to?',
			initial: cwd,
		},
		{
			type: 'input',
			name: 'name',
			required: true,
			message: 'What is the name of the project?',
		},
		{
			type: 'select',
			name: 'component',
			message: 'Pick the type of the project',
			choices: ['npm', 'vsx', 'skip'],
		},
	]);

	let answers: Answers;

	if(response1.component === 'npm') {
		const question2 = [
			confirm({
				name: 'test',
				message: 'Add unit testing?',
			}),
		];

		if(EDITOR) {
			question2.push(confirm({
				name: 'editor',
				message: 'Open editor?',
			}));
		}

		const response2 = await enquirer.prompt<{ test: boolean; editor?: boolean }>(question2);

		answers = {
			...response1,
			...response2,
			language: 'typescript',
			author: true,
			manager: 'npm',
		};
	}
	else if(response1.component === 'vsx') {
		const question2 = [
			confirm({
				name: 'test',
				message: 'Add unit testing?',
			}),
			{
				type: 'select',
				name: 'bundler',
				message: 'Pick the bundler to use',
				choices: ['skip', 'ncc', 'webpack'],
			},
		];

		if(EDITOR) {
			question2.push(confirm({
				name: 'editor',
				message: 'Open editor?',
			}));
		}

		const response2 = await enquirer.prompt<{ test: boolean; bundler: string; editor?: boolean }>(question2);

		answers = {
			...response1,
			...response2,
			language: 'typescript',
			author: true,
			manager: 'npm',
		};
	}
	else {
		const question2 = [
			{
				type: 'list',
				name: 'language',
				message: 'Pick the language',
				choices: ['typescript', 'skip'],
			},
			confirm({
				name: 'test',
				message: 'Add unit testing?',
			}),
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

		const response2 = await enquirer.prompt<{ language: string; test: boolean; manager: string; editor?: boolean }>(question2);

		answers = { ...response1, ...response2 };
	}

	const root = path.join(answers.cwd, answers.name);

	if(fse.existsSync(root)) {
		const response3 = await enquirer.prompt(confirm({
			name: 'remove',
			message: 'The project is already existing. Should it be trashed?',
		}));

		answers = { ...answers, ...response3 };
	}

	return answers;
}
