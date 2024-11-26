const express = require("express");
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "X-Value-x, X-Value-y, Content-Type");
	res.setHeader("Access-Control-Expose-Headers", "X-Value-z");

	if (req.method == "OPTIONS") {
		return res.status(200).end();
	}

	next();
});

app.use(express.json());

app.post("/calc", (req, res) => {
	const x = parseFloat(req.headers["x-value-x"]);
	const y = parseFloat(req.headers["x-value-y"]);

	console.log(`received x: ${x}, y: ${y}`);

	if (!isNaN(x) && !isNaN(y)) {
		const z = x + y;
		res.setHeader("X-Value-z", z.toString());
		console.log(`Sending z: ${z}`);
		res.status(200).end();
	}
	else {
		res.status(400).send("Incorrect data");
	}
});

app.listen(3000, () => {
	console.log("Serv on port 3000");
});
