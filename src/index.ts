/* eslint-disable no-case-declarations */
import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import getCustomer from './getCustomer';
import confirmPaymentIntent from './confirmPaymentIntent';
import createPaymentIntent from './createPaymentIntent';
import createCustomer from './createCustomer';

export const http: HttpFunction = async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);
	res.setHeader('Content-Type', 'application/json');

	switch (req.path) {
		case '/getCustomer':
			const customer = await getCustomer(req);
			res.status(200).json(customer);
			break;
		case '/createPaymentIntent':
			const paymentIntent = await createPaymentIntent(req);
			res.status(201).json(paymentIntent);
			break;
		case '/confirmPaymentIntent':
			const paymentIntentConfirmation = await confirmPaymentIntent(req);
			res.status(201).json(paymentIntentConfirmation);
			break;
		case '/createCustomer':
			const createdCustomer = await createCustomer(req);
			res.status(201).json(createdCustomer);
			break;
		default:
			res.status(405).send({ error: 'No method!' });
			break;
	}
};
