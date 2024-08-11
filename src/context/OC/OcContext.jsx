'use client';
import { createContext, useEffect, useState } from 'react';
import { approvalEventsDb, ocDataDb } from '@/utils/consts';
import { usePathname } from 'next/navigation';

export const OcContext = createContext(undefined);

const OcProvider = ({ children }) => {
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [purchaseOrder, setPurchaseOrder] = useState({});
	const [approvalEvents, setApprovalEvents] = useState([]);
	const pathname = usePathname();

	useEffect(() => {
		setPurchaseOrders(ocDataDb);
	}, []);

	useEffect(() => setPurchaseOrder({}), [pathname]);

	const getPurchaseOrder = purchaseOrderNumber => {
		if (!purchaseOrderNumber) return setPurchaseOrder({});

		const foundOc = purchaseOrders.find(el => {
			return el.oc_number === purchaseOrderNumber;
		});
		setPurchaseOrder(foundOc);
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
		approvalEvents,
		getApprovalEvents,
	};

	return <OcContext.Provider value={data}>{children}</OcContext.Provider>;
};

export default OcProvider;
