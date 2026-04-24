import { type Configuration } from '../types.js';
import { exec, type ExecResult } from '../utils/exec.js';

export async function installArtifacts({ artifacts, root, repository }: Configuration): ExecResult {
	const args = ['add'];

	if(repository) {
		args.push('--var', `REPOSITORY_OWNER=${repository.owner}`, '--var', `REPOSITORY_NAME=${repository.name}`);
	}

	args.push(...artifacts);

	return exec('artifact', args, { cwd: root, stdio: 'inherit' });
}
