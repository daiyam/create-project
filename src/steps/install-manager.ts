import { type Configuration } from '../types.js';
import { exec, type ExecResult } from '../utils/exec.js';

export async function installManager({ answers: { manager }, root }: Configuration): ExecResult {
	if(manager === 'yarn') {
		return exec('yarn', ['install'], { cwd: root, stdio: 'inherit' });
	}
	else {
		return exec('npm', ['install'], { cwd: root, stdio: 'inherit' });
	}
}
