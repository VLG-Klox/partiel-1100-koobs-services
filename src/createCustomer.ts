import Stripe from 'stripe';
import * as express from 'express';

const PAYMENT_TOKEN = process.env.REACT_APP_PAYMENT_TOKEN;

const stripe = new Stripe(PAYMENT_TOKEN as string, {
	apiVersion: '2020-08-27',
});

//req: createCustomer?name=John%20Doe&email=john.doe@example.org
const createCustomer = (
	req: express.Request
): Promise<Stripe.Customer | void> =>
	(async () => {
		try {
			const { name, email, idempotencyKey } = req.query;

			const customer: Stripe.Customer = await stripe.customers.create(
				{
					name: name as string,
					email: email as string,
				},
				{
					idempotencyKey: idempotencyKey as string,
				}
			);

			return customer;
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default createCustomer;
