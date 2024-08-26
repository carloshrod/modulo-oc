'use client';
import { createContext, useEffect, useState } from 'react';
import { approvalEventsDb, ocDataDb } from '@/utils/consts';
import { fetchData } from '../utils';

export const OcContext = createContext(undefined);

const OcProvider = ({ children }) => {
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [purchaseOrder, setPurchaseOrder] = useState({});
	const [purchaseOrderToReceive, setPurchaseOrderToReceive] = useState({});
	const [approvalEvents, setApprovalEvents] = useState([]);
	const [generalItems, setGeneralItems] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [accountCosts, setAccountCosts] = useState([]);

	const getGeneralItems = async () => {
		const res = await fetchData('/general-items');
		setGeneralItems(res);
	};

	const getSuppliers = async () => {
		const res = await fetchData('/suppliers');
		setSuppliers(res);
	};

	const getAccountCosts = async () => {
		const res = await fetchData('/account-costs');
		setAccountCosts(res);
	};

	useEffect(() => {
		setPurchaseOrders(ocDataDb);
		getGeneralItems();
		getSuppliers();
		getAccountCosts();
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
		generalItems,
		setGeneralItems,
		suppliers,
		accountCosts,
	};

	return <OcContext.Provider value={data}>{children}</OcContext.Provider>;
};

export default OcProvider;
