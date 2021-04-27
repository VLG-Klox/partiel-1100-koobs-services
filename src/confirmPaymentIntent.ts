import Stripe from 'stripe';
import * as express from 'express';
import isEmpty from './isEmpty';

const PAYMENT_TOKEN = process.env.REACT_APP_PAYMENT_TOKEN;

const stripe = new Stripe(PAYMENT_TOKEN as string, {
	apiVersion: '2020-08-27',
});

// req: confirmPaymentWithMandate?customerId=cst_VMsyUyBuNe&amount=10.00&currency=EUR&description=Order1&redirectUrl=https://www.redirect.com&metadata=metadata(json)
const confirmPaymentWithMandate = (
	req: express.Request
): Promise<Stripe.PaymentIntent | void> =>
	(async () => {
		try {
			const requestPayment = isEmpty(req.query) ? req.body : req.query;

			const { clientSecret, method, idempotencyKey } = requestPayment;

			const payment: Stripe.PaymentIntent = await await stripe.paymentIntents.confirm(
				clientSecret,
				{ payment_method: method as string },
				{
					idempotencyKey: idempotencyKey as string,
				}
			);

			return payment;
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default confirmPaymentWithMandate;
