const express = require('express');
const jsonServer = require("json-server");
const chokidar = require("chokidar");
const cors = require("cors");
const port = process.env.PORT || 3500;
const fileName = process.argv[2] || "./data.js";
const history = require("connect-history-api-fallback");

let router = undefined;

const app = express();

const createServer = () => {
	delete require.cache[require.resolve(fileName)];
	setTimeout(() => {
		router = jsonServer.router(fileName.endsWith(".js") ? require(fileName)() : fileName);
	}, 100)
}

createServer();

app.use(history());
app.use("/", express.static("./build"));
app.use(cors());
app.use(jsonServer.bodyParser)
app.use("/api", (req, resp, next) => router(req, resp, next));

chokidar.watch(fileName).on("change", () => {
	console.log("Reloading web service data...");
	createServer();
	console.log("Reloading web service data complete.");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});