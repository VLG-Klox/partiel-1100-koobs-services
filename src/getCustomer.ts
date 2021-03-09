/**
 * @docs https://docs.mollie.com/reference/v2/customers-api/get-customer
 */
import { createMollieClient } from '@mollie/api-client';

const mollieClient = createMollieClient({
	apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM',
});

const getCustomer = (): Promise<void> =>
	(async () => {
		try {
			const customer = await mollieClient.customers.get('cst_pzhEvnttJ2');

			console.log(customer);
		} catch (error) {
			console.warn(error);
		}
	})();

export default getCustomer;
