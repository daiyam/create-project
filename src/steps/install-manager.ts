import { execa } from 'execa';
import { type Configuration } from '../types.js';

export async function installManager({ answers: { manager }, root }: Configuration): Promise<void> {
	if(manager === 'yarn') {
		await execa('yarn', ['install', '--silent'], { cwd: root });
	}
	else {
		await execa('npm', ['install', '--silent'], { cwd: root });
	}
}
