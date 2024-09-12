import axios from 'axios';
import { fetchData } from './utils';
import { env } from '@/config/env';

export const getPurchaseOrderByNumber = async ({
	poNumber,
	includeEvents = true,
}) => {
	try {
		const res = await axios.get(
			`${env.API_URL}/purchase-orders/po-number/${poNumber}?includeEvents=${includeEvents}`,
		);
		if (res.status === 200) {
			return res.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export const savePurchaseOrder = async purchaseOrder => {
	try {
		const res = !purchaseOrder?.id
			? await axios.post(`${env.API_URL}/purchase-orders`, purchaseOrder)
			: await axios.put(
					`${env.API_URL}/purchase-orders/${purchaseOrder.id}`,
					purchaseOrder,
				);
		if (res.status === 200) {
			return res;
		}
	} catch (error) {
		console.error(error);
	}
};

export const sendPurchaseOrderForApprove = async options => {
	try {
		const { poId, submittedBy } = options;
		const res = await axios.patch(`${env.API_URL}/purchase-orders/${poId}`, {
			submittedBy,
		});
		if (res.status === 200) {
			return res.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export const deletePurchaseOrder = async purchaseOrderId => {
	try {
		const res = await axios.delete(
			`${env.API_URL}/purchase-orders/${purchaseOrderId}`,
		);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getSuppliers = async () => {
	const res = await fetchData('/suppliers');
	return res;
};

export const getAccountCosts = async () => {
	const res = await fetchData('/account-costs');
	return res;
};

export const getGeneralItems = async () => {
	const res = await fetchData('/general-items');
	return res;
};
