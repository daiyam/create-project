import { type Configuration } from '../types.js';
import { exec, type ExecResult } from '../utils/exec.js';

export async function setupRepo({ repository }: Configuration): ExecResult {
	return exec('repo-starter-kit', ['--repo', `${repository!.owner}/${repository!.name}`, '--create'], { stdio: 'inherit' });
}
