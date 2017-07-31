const fs = require("fs");

module.exports = fs.createWriteStream("/dev/usb/lp0");
