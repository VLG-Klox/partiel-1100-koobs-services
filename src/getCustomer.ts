/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/get-customer
 */
import createMollieClient, { Customer } from '@mollie/api-client';
import * as express from 'express';

const mollieClient = createMollieClient({
	apiKey: 'test_bqWcQQ3wCurBd9ASDMQEaE6sEHV9c3',
});

// req: getCustomer?customerId=cst_pzhEvnttJ2
const getCustomer = (req: express.Request): Promise<Customer | void> =>
	(async () => {
		try {
			const customerId = req.query.customerId as string;
			const customer = await mollieClient.customers.get(customerId);

			return customer;
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default getCustomer;
