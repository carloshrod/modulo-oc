'use client';
import { createContext, useEffect, useState } from 'react';
import { approvalEventsDb, ocDataDb } from '@/utils/consts';

export const OcContext = createContext(undefined);

const OcProvider = ({ children }) => {
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [purchaseOrder, setPurchaseOrder] = useState({});
	const [purchaseOrderToReceive, setPurchaseOrderToReceive] = useState({});
	const [approvalEvents, setApprovalEvents] = useState([]);

	useEffect(() => {
		setPurchaseOrders(ocDataDb);
	}, []);

	const findPurchaseOrder = purchaseOrderNumber => {
		const foundOc = purchaseOrders.find(el => {
			return el.oc_number === purchaseOrderNumber;
		});

		return foundOc;
	};

	const getPurchaseOrder = purchaseOrderNumber => {
		if (!purchaseOrderNumber) return setPurchaseOrder({});
		const foundOc = findPurchaseOrder(purchaseOrderNumber);
		setPurchaseOrder(foundOc);
	};

	const getPurchaseOrderToReceive = purchaseOrderNumber => {
		if (!purchaseOrderNumber) return setPurchaseOrderToReceive({});
		const foundOc = findPurchaseOrder(purchaseOrderNumber);
		setPurchaseOrderToReceive(foundOc);
	};

	const getApprovalEvents = purchaseOrderId => {
		const foundEvent = approvalEventsDb.filter(apvEvent => {
			return apvEvent.oc_id === purchaseOrderId;
		});
		setApprovalEvents(foundEvent);
	};

	const data = {
		purchaseOrders,
		purchaseOrder,
		getPurchaseOrder,
		purchaseOrderToReceive,
		getPurchaseOrderToReceive,
		approvalEvents,
		getApprovalEvents,
	};

	return <OcContext.Provider value={data}>{children}</OcContext.Provider>;
};

export default OcProvider;
