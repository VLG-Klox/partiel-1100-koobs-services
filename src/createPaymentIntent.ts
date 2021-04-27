import Stripe from 'stripe';
import * as express from 'express';
import isEmpty from './isEmpty';

const PAYMENT_TOKEN = process.env.REACT_APP_PAYMENT_TOKEN;

const stripe = new Stripe(PAYMENT_TOKEN as string, {
	apiVersion: '2020-08-27',
});

// req: createPaymentIntent?customerId=cst_VMsyUyBuNe&amount=1000&currency=EUR&description=Order1&metadata=metadata(json)&statement_descriptor
const createPaymentIntent = (
	req: express.Request
): Promise<Stripe.PaymentIntent | void> =>
	(async () => {
		try {
			const requestPayment = isEmpty(req.query) ? req.body : req.query;

			const {
				customerId,
				amount,
				currency,
				method,
				description,
				metadata,
				idempotencyKey,
			} = requestPayment;

			const intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
				{
					customer: customerId as string,
					amount: amount as number,
					currency: currency as string,
					payment_method_types: method as string[],
					description: description as string,
					statement_descriptor: description as string,
					metadata: metadata as Stripe.MetadataParam,
					setup_future_usage: 'off_session',
				},
				{
					idempotencyKey: idempotencyKey as string,
				}
			);

			return intent;
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default createPaymentIntent;
