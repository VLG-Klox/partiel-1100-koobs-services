import Stripe from 'stripe';
import * as express from 'express';

const PAYMENT_TOKEN = process.env.REACT_APP_PAYMENT_TOKEN;

const stripe = new Stripe(PAYMENT_TOKEN as string, {
	apiVersion: '2020-08-27',
});

// req: getCustomer?customerId=cst_pzhEvnttJ2
const getCustomer = (req: express.Request): Promise<Stripe.Customer | void> =>
	(async () => {
		try {
			const customerId = req.query.customerId as string;
			const customer = await stripe.customers.retrieve(customerId);

			return customer;
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default getCustomer;
