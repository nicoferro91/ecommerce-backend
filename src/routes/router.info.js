const express = require("express");
const { Router } = express;
const routerInfo = Router();

const { argv, platform, version, memoryUsage, cwd, pid, execPath } = process;
const numCPUs = require("os").cpus().length;

routerInfo.get("/info", (req, res) => {
	const arguments = argv.slice(2).join(" || ");

	res.render("info", {
		execArgv: arguments.length ? arguments : "Ninguno",
		platform,
		version,
		memoryUsage: memoryUsage().rss,
		cwd: cwd(),
		pid,
		execPath,
		numCPUs
	});
});

module.exports = { routerInfo };
