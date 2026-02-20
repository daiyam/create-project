// eslint-disable-next-line import/extensions
import StringPrompt from 'enquirer/lib/types/string.js';

export class Invisible extends StringPrompt {
	constructor(options = {}) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		super(options);
	}

	format() {
		return '';
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async render() {
	}

	async run() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
		return super.run();
	}
}
