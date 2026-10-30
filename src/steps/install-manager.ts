import type { AsyncDResult } from '@zokugun/xtry';
import type { Configuration } from '../types.js';

import { logger } from '@zokugun/cli-utils';
import { err, OK, stringifyError } from '@zokugun/xtry';

import { exec } from '../utils/exec.js';

export async function installManager({ root, install, minReleaseAge }: Configuration): AsyncDResult {
	const args = ['install'];

	if(typeof minReleaseAge === 'number') {
		args.push('--min-release-age', String(Math.ceil(minReleaseAge / 24)));
	}

	if(install) {
		const result = await exec('npm', args, { cwd: root, stdio: 'inherit' });

		if(result.fails) {
			return err(stringifyError(result.error));
		}
	}
	else {
		logger.info(['npm', ...args].join(' '));
	}

	return OK;
}
