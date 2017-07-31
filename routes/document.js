const _ = require("koa-route");
const lp = require("../lib/lp");
const render = require("../lib/render");

module.exports = _.post("/document", async ctx => {
	lp.write(render(ctx.request.rawBody + "\n"));

	ctx.body = JSON.stringify({
		success: true
	});
});
