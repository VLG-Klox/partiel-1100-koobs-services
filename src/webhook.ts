import Stripe from 'stripe';
import * as express from 'express';

const PAYMENT_SECRET = process.env.PAYMENT_SECRET;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const stripe = new Stripe(PAYMENT_SECRET as string, {
	apiVersion: '2020-08-27',
});

const webhook = (req: express.Request): Promise<void> =>
	(async () => {
		try {
			const { data, eventType } = req.query;
			const signature = req.headers['stripe-signature'];

			// Check if webhook signing is configured.
			if (WEBHOOK_SECRET) {
				// Retrieve the event by verifying the signature using the raw body and secret.
				let event;

				try {
					event = stripe.webhooks.constructEvent(
						// @ts-ignore
						req.rawBody,
						// @ts-ignore
						signature,
						WEBHOOK_SECRET
					);
				} catch (err) {
					console.log(`⚠️  Webhook signature verification failed.`);
				}

				//const data = event.data;
				//const eventType = event.type;
			} else {
				console.log(` secret is not configured in config.js`);
			}

			if (eventType === 'payment_intent.succeeded') {
				// Funds have been captured
				// Fulfill any orders, e-mail receipts, etc
				// To cancel the payment you will need to issue a Refund (https://stripe.com/docs/api/refunds)
				console.log('💰 Payment received!');
			} else if (eventType === 'payment_intent.payment_failed') {
				console.log('❌ Payment failed.');
			}
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default webhook;
