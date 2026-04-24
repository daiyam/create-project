import { type Configuration } from '../types.js';
import { exec, type ExecResult } from '../utils/exec.js';

export async function setupGit({ root, repository }: Configuration): ExecResult {
	const result = await exec('git', ['branch', '-M', 'master'], { cwd: root });
	if(result.fails) {
		return result;
	}

	return exec('git', ['remote', 'add', 'origin', `git@github.com:${repository!.owner}/${repository!.name}.git`], { cwd: root });
}
