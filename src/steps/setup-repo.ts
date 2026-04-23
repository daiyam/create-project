import { execa } from 'execa';
import { type Configuration } from '../types.js';

export async function setupRepo({ root, repository }: Configuration): Promise<void> {
	await execa('repo-starter-kit', ['--repo', repository!, '--create'], { stdio: 'inherit' });
}
