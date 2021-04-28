import Stripe from 'stripe';
import * as express from 'express';

const PAYMENT_SECRET = process.env.PAYMENT_SECRET;

const stripe = new Stripe(PAYMENT_SECRET as string, {
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
