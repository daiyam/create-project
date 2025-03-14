import { type Configuration } from '../types.js';

export async function installGit({ root }: Configuration): Promise<void> {
	const { execa } = await import('execa');

	await execa('git', ['init', '--quiet'], { cwd: root });
}
