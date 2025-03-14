import { type Configuration } from '../types.js';

export async function installArtifacts({ artifacts, root }: Configuration): Promise<void> {
	const { execa } = await import('execa');

	await execa('artifact', ['add', ...artifacts], { cwd: root });
}
