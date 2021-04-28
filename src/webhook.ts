import Stripe from 'stripe';
import * as express from 'express';

const PAYMENT_SECRET = process.env.PAYMENT_SECRET;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const stripe = new Stripe(PAYMENT_SECRET as string, {
	apiVersion: '2020-08-27',
});

const webhook = (
	req: express.Request
): Promise<void> =>
	(async () => {
		try {
			const { data, eventType } = req.query;

			// Check if webhook signing is configured.
			if (process.env.WEBHOOK_SECRET) {
			  // Retrieve the event by verifying the signature using the raw body and secret.
			  let event;
			  let signature = req.headers["stripe-signature"];
			  try {
				event = stripe.webhooks.constructEvent(
				  req.rawBody,
				  signature,
				  process.env.WEBHOOK_SECRET
				);
			  } catch (err) {
				console.log(`⚠️  Webhook signature verification failed.`);
				
			  }
			  data = event.data;
			  eventType = event.type;
			} else {
			  // Webhook signing is recommended, but if the secret is not configured in `config.js`,
			  // we can retrieve the event data directly from the request body.
			  data = req.body.data;
			  eventType = req.body.type;
			}
		  
			if (eventType === "payment_intent.succeeded") {
			  // Funds have been captured
			  // Fulfill any orders, e-mail receipts, etc
			  // To cancel the payment you will need to issue a Refund (https://stripe.com/docs/api/refunds)
			  console.log("💰 Payment received!");
			} else if (eventType === "payment_intent.payment_failed") {
			  console.log("❌ Payment failed.");
			}
			
	})();

export default createCustomer;
