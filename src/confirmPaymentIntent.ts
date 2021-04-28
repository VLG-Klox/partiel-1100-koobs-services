import Stripe from 'stripe';
import * as express from 'express';
import isEmpty from './isEmpty';

const PAYMENT_SECRET = process.env.PAYMENT_SECRET;

const stripe = new Stripe(PAYMENT_SECRET as string, {
	apiVersion: '2020-08-27',
});

// req: confirmPaymentIntent?intentId=pi_1IlA1qDIVQViqH78HWujXI1W&method=card
const confirmPaymentWithMandate = (
	req: express.Request
): Promise<Stripe.PaymentIntent | void> =>
	(async () => {
		try {
			const requestPayment = isEmpty(req.query) ? req.body : req.query;

			const { intentId, method, idempotencyKey } = requestPayment;

			const payment: Stripe.PaymentIntent = await await stripe.paymentIntents.confirm(
				intentId,
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
