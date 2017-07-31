const fs = require("fs");

const stream = fs.createWriteStream("/dev/usb/lp0");

module.exports = {
	write(buf, ...params) {
		if(!(buf instanceof Buffer)) {
			buf = Buffer.from(buf);
		}

		for(let i = 0; i < buf.length; i++) {
			/* replace pound sign */
			if(buf[i] == 163) {
				buf[i] = 156;
				buf[i - 1] = 0;
			}
		}

		stream.write(buf, ...params);
	},

	end() {

	}
};
