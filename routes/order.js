const _ = require("koa-route");
const Mustache = require("mustache");
const lp = require("../lib/lp");
const utils = require("../lib/utils");
const { centerPad, format, textWrap } = utils;
const render = require("../lib/render");

module.exports = _.post("/order", async ctx => {
	const { body } = ctx.request;

	lp.write(`\n${utils.heading}${centerPad(body.merchant, 16)}\n\n`);
	lp.write(`${utils.plain}${centerPad(body.date)}\n`);
	lp.write(`${utils.plain}${centerPad(body.order)}\n\n`);

	for(let item of body.items) {
		const price = item.price.toString();
		const name = item.name.slice(0, 32 - price.length - 1);

		lp.write(`${utils.plain}${utils.format([ name, price ])}`);

		if(item.extra != undefined) {
			lp.write(`${render(item.extra)}\n`);
		}
	}

	const total = body.total.toString();

	lp.write(`${utils.plain}${"-".repeat(32)}`);
	lp.write(`${utils.plain}${format([ "Total", total ])}`);
	lp.write(`${utils.plain}${"-".repeat(32)}\n\n`);
	lp.write(`${render(body.text)}`);

	lp.write("\n\n\n\n");

	ctx.body = JSON.stringify({ success: true });
});
