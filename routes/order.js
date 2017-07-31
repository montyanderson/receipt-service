const _ = require("koa-route");
const lp = require("../lib/lp");

const heading = Buffer.from([ 27, 33, 32 ]);
const plain = Buffer.from([ 27, 33, 0 ]);
const smaller = Buffer.from([ 27, 33, 1 ]);

function centerPad(text, width = 32) {
	text = text.toString();

	const pad = " ".repeat((width - text.length) / 2);
	return `${pad}${text}${pad}\n`;
}

function rightPad(text, width = 32) {
	text = text.toString();

	const pad = " ".repeat(width - text.length);
	return `${pad}${text}\n`;
}

function format(arr, width = 32) {
	const totalPadding = arr
		.map(a => a.toString())
		.reduce((a, b) => a + b.length, 0);

	const pad = " ".repeat((width - totalPadding) / (arr.length - 1));
	return arr.join(pad) + "\n";
}

function textWrap(text, width = 32) {
	text = text.toString();

	for(let i = width - 1; i < text.length; i += width) {
		while(text[i] != " ") {
			i--;
		}

		text = text.slice(0, i) + "\n" + text.slice(i + 1);
	}

	return text;
}

module.exports = _.post("/order", async ctx => {
	const { body } = ctx.request;

	lp.write(`\n${heading}${centerPad(body.merchant, 16)}\n`);
	lp.write(`${plain}${centerPad(body.date)}`);
	lp.write(`${plain}${centerPad(body.order)}\n`);

	for(let item of body.items) {
		const price = item.price.toString();
		const name = item.name.slice(0, 32 - price.length - 1);

		lp.write(`${plain}${format([ name, price ])}`);
	}

	const total = body.total.toString();

	lp.write(`${plain}${"-".repeat(32)}`);
	lp.write(`${plain}${format([ "Total", total ])}`);
	lp.write(`${plain}${"-".repeat(32)}\n\n`);
	lp.write(`${smaller}${textWrap(body.text, 42)}\n`);
});
