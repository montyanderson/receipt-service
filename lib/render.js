const Mustache = require("mustache");
const utils = require("./utils");

module.exports = template => utils.smaller + Mustache.render(template, {
	br: "\n",
	center() {
		return (text, render) => utils.centerPad(render(text), 42);
	},
	wrap() {
		return (text, render) => utils.textWrap(render(text), 42);
	},
	u() {
		return (text, render) => ``; //${Buffer.from([ 27, 45, 2 ])}${render(text)}${Buffer.from([ 27, 45, 0 ])}`
	}
});
