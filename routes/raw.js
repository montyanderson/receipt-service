const _ = require("koa-route");
const lp = require("../lib/lp");

module.exports = _.post("/raw", async ctx => {
	lp.write(ctx.request.rawBody);

	ctx.body = JSON.stringify({
		success: true
	});
});
