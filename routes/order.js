const _ = require("koa-route");
const lp = require("../lib/lp");

const heading = Buffer.from([ 27, 33, 32 ]);
const plain = Buffer.from([ 27, 33, 0 ]);

module.exports = _.post("/order", async ctx => {
	const merchant = ctx.request.body.merchant.slice(0, 16);
	const merchantPadding = " ".repeat((16 - merchant.length) / 2);

	lp.write(`${heading}${merchantPadding}${merchant}${merchantPadding}\n\n`)

	for(let item of ctx.request.body.items) {
		const price = item.price.toString();
		const name = item.name.slice(0, 32 - price.length - 1);

		lp.write(`${plain}${name}${" ".repeat(32 - (name.length + price.length))}${price}\n`);
	}
});
