import { type Configuration } from '../types.js';
import { exec, type ExecResult } from '../utils/exec.js';

export async function installGit({ root }: Configuration): ExecResult {
	return exec('git', ['init', '--quiet'], { cwd: root });
}
