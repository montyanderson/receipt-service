const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(bodyParser());

app.use(require("./routes/raw"));
app.use(require("./routes/document"));
app.use(require("./routes/order"));

app.listen(8080);
