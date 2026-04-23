import { execa } from 'execa';
import { type Configuration } from '../types.js';

export async function setupGit({ root, repository }: Configuration): Promise<void> {
	await execa('git', ['branch', '-M', 'master'], { cwd: root });
	await execa('git', ['remote', 'add', 'origin', `git@github.com:${repository}.git`], { cwd: root });
}
