import { type Configuration } from '../types.js';

export async function installManager({ answers: { manager }, root }: Configuration): Promise<void> {
	const { execa } = await import('execa');

	if(manager === 'yarn') {
		await execa('yarn', ['install', '--silent'], { cwd: root });
	}
	else {
		await execa('npm', ['install', '--silent'], { cwd: root });
	}
}
