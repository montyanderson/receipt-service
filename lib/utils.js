const utils = module.exports = {
	heading: Buffer.from([ 27, 33, 32 ]),
	plain: Buffer.from([ 27, 33, 0 ]),
	smaller: Buffer.from([ 27, 33, 1 ]),

	centerPad(text, width = 32) {
		return utils.textWrap(text, width).split("\n").map(line => {
			const pad = " ".repeat((width - line.length) / 2);
			return `${pad}${line}`;
		}).join("\n");
	},

	rightPad(text, width = 32) {
		text = text.toString();

		const pad = " ".repeat(width - text.length);
		return `${pad}${text}\n`;
	},

	format(arr, width = 32) {
		const totalPadding = arr
			.map(a => a.toString())
			.reduce((a, b) => a + b.length, 0);

		const pad = " ".repeat((width - totalPadding) / (arr.length - 1));
		return arr.join(pad) + "\n";
	},

	textWrap(text, width = 32) {
		text = text.toString();

		for(let i = width - 1; i < text.length; i += width) {
			while(text[i] != " " && i >= 0) {
				i--;
			}

			text = text.slice(0, i) + "\n" + text.slice(i + 1);
		}

		return text;
	}

};
