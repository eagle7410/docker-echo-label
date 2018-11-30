const http    = require('http');
const express = require('express');

class Server {
	/**
	 *
	 * @param {number} port
	 * @param {number} version
	 */
	constructor (port, version) {

		process.env.TZ = 'Europe/London';

		this.port        = port;
		this._express    = express;
		this._app        = express();
		this._version    = String(version || 1);
		this._server     = http.Server(this._app);
		this._serverName = `ServerFrameV${this._version}`;
	}

	async up () {

		this._app.all(
			'/',
			(req, res) => res.status(200)
				.json({
					label : `Label is ${process.env.SERVER_LABEL || '!!! NOT SET'}`
				})
		);

		this._server.listen(this.port, async () => {
			const baseLine = `=== ${this._serverName} APP READY IN PORT ${this.port} ===\n`;
			const len = baseLine.length - 1;

			console.log(
				`\n\n ${'='.repeat(len)}\n ${baseLine} ${'='.repeat(len)}\n`,
				`link in browser http://localhost:${this.port}\n\n`,
			);
		});
	}

	down () {
		return new Promise( closed => {
			this._server.close(() => closed());
		});
	}
}

module.exports = Server;
