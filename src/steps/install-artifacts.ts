import { type Configuration } from '../types.js';
import { exec, type ExecResult } from '../utils/exec.js';

export async function installArtifacts({ artifacts, root }: Configuration): ExecResult {
	return exec('artifact', ['add', ...artifacts], { cwd: root, stdio: 'inherit' });
}
