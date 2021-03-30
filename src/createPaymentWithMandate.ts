/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer-payment
 */
import createMollieClient, { Payment, SequenceType } from '@mollie/api-client';
import * as express from 'express';
import isEmpty from './isEmpty';

const mollieClient = createMollieClient({
	apiKey: 'test_bqWcQQ3wCurBd9ASDMQEaE6sEHV9c3',
});

// req: createPaymentWithMandate?customerId=cst_VMsyUyBuNe&amount=10.00&currency=EUR&description=Order1&redirectUrl=https://www.redirect.com&metadata=metadata(json)
const createPaymentWithMandate = (
	req: express.Request
): Promise<Payment | void> =>
	(async () => {
		try {
			const requestPayment = isEmpty(req.query) ? req.body : req.query;

			const {
				customerId,
				amount,
				currency,
				description,
				metadata,
				redirectUrl,
			} = requestPayment;

			const payment: Payment = await mollieClient.customers_payments.create({
				customerId: customerId as string,
				amount: {
					value: amount as string,
					currency: currency as string,
				},
				description: description as string,
				metadata: metadata as string,
				method: [],
				redirectUrl: redirectUrl as string,
				sequenceType: SequenceType.first,
			});

			return payment;
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default createPaymentWithMandate;
