/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/create-customer
 */
import createMollieClient, { Customer } from '@mollie/api-client';
import * as express from 'express';

const mollieClient = createMollieClient({
	apiKey: 'test_bqWcQQ3wCurBd9ASDMQEaE6sEHV9c3',
});

//req: createCustomer?name=John%20Doe&email=john.doe@example.org
const createCustomer = (req: express.Request): Promise<Customer | void> =>
	(async () => {
		try {
			const { name, email } = req.query;

			const customer: Customer = await mollieClient.customers.create({
				name: name as string,
				email: email as string,
			});

			return customer;
		} catch (error) {
			console.error(error);
			return error;
		}
	})();

export default createCustomer;
