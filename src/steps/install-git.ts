import { execa } from 'execa';
import { type Configuration } from '../types.js';

export async function installGit({ root }: Configuration): Promise<void> {
	await execa('git', ['init', '--quiet'], { cwd: root });
}
