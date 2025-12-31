import { execa } from 'execa';
import { type Configuration } from '../types.js';

export async function installArtifacts({ artifacts, root }: Configuration): Promise<void> {
	await execa('artifact', ['add', ...artifacts], { cwd: root, stdio: 'inherit' });
}
