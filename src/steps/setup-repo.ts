import { type Configuration } from '../types.js';
import { exec, type ExecResult } from '../utils/exec.js';

export async function setupRepo({ root, repository }: Configuration): ExecResult {
	return exec('repo-starter-kit', ['--repo', repository!, '--create'], { stdio: 'inherit' });
}
