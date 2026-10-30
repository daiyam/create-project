import type { AsyncDResult } from '@zokugun/xtry';
import type { Configuration } from '../types.js';

import { logger } from '@zokugun/cli-utils';
import { err, OK, stringifyError } from '@zokugun/xtry';

import { exec } from '../utils/exec.js';

export async function installArtifacts({ artifacts, root, repository, install, minReleaseAge }: Configuration): AsyncDResult {
	const args = ['add'];

	if(repository) {
		args.push('--var', `REPOSITORY_OWNER=${repository.owner}`, '--var', `REPOSITORY_NAME=${repository.name}`);
	}

	if(typeof minReleaseAge === 'number') {
		args.push('--age', String(minReleaseAge));
	}

	args.push(...artifacts);

	if(install) {
		const result = await exec('artifact', args, { cwd: root, stdio: 'inherit' });

		if(result.fails) {
			return err(stringifyError(result.error));
		}
	}
	else {
		logger.info(['artifact', ...args].join(' '));
	}

	return OK;
}
