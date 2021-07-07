/* eslint-disable no-case-declarations */
import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import getKoobs from './getKoobs';

export const http: HttpFunction = async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);
	res.setHeader('Content-Type', 'application/json');

	switch (req.path) {
		case '/getKoobs':
			const koobs = await getKoobs(req, res);
			res.status(200).json(koobs);
			break;
		
		default:
			res.status(405).send({ error: 'No method!' });
			break;
	}
};
