import axios from 'axios';
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
	const res = !purchaseOrder?.id
		? await axios.post(`${env.API_URL}/purchase-orders`, purchaseOrder)
		: await axios.put(
				`${env.API_URL}/purchase-orders/${purchaseOrder.id}`,
				purchaseOrder,
			);

	return res;
};

export const SendPoForApproveFromForm = async purchaseOrder => {
	const res = !purchaseOrder.id
		? await axios.post(`${env.API_URL}/purchase-orders`, purchaseOrder)
		: await axios.put(
				`${env.API_URL}/purchase-orders/${purchaseOrder.id}`,
				purchaseOrder,
			);

	return res;
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

export const cancelPurchaseOrder = async (purchaseOrderId, canceledBy) => {
	try {
		const res = await axios.delete(
			`${env.API_URL}/purchase-orders/${purchaseOrderId}`,
			canceledBy,
		);
		return res;
	} catch (error) {
		console.error(error);
	}
};

export const createGeneralItem = async generalItem => {
	const res = await axios.post(`${env.API_URL}/general-items`, generalItem);
	if (res.status === 200) {
		return res.data;
	}
};
