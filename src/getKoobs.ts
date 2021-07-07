import * as express from 'express';


const getKoobs = (req: express.Request, res: express.Response): Promise<any | void> =>
	(async () => {
		try {

		// Keep the good verb
    	if (req.method !== "GET") {
			return res.sendStatus(400)
		}
		const fs = require('fs');
		const path = require('path');
		
		let rawdata = fs.readFileSync(path.resolve(__dirname, 'koobs.json'));
		let koobs = JSON.parse(rawdata);

		return koobs;
		} catch (error) {
			return error;
		}
	})();

export default getKoobs;
