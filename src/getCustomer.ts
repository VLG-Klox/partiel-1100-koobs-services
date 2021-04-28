import Stripe from 'stripe';
import * as express from 'express';

const PAYMENT_SECRET = process.env.PAYMENT_SECRET;

const stripe = new Stripe(PAYMENT_SECRET as string, {
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
