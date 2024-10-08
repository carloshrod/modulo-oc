'use client';
import { createContext, useEffect, useState } from 'react';

export const PurchaseOrderContext = createContext(undefined);

const PurchaseOrderProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState({});
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [purchaseOrder, setPurchaseOrder] = useState({});
	const [purchaseOrderToReceive, setPurchaseOrderToReceive] = useState({});
	const [generalItems, setGeneralItems] = useState([]);
	const [receipts, setReceipts] = useState([]);

	useEffect(() => {
		const storedUser = localStorage.getItem('loggedUser');
		if (storedUser) {
			setLoggedUser(JSON.parse(storedUser));
		}
	}, []);

	const updatePurchaseOrder = purchaseOrderToUpdate => {
		const newData = purchaseOrders.map(po =>
			po.id === purchaseOrderToUpdate.id ? purchaseOrderToUpdate : po,
		);

		setPurchaseOrders(newData);
	};

	const updateReceipt = receiptToUpdate => {
		const newData = receipts.map(r =>
			r.id === receiptToUpdate.id ? receiptToUpdate : r,
		);

		setReceipts(newData);
	};

	const data = {
		loggedUser,
		setLoggedUser,
		purchaseOrders,
		setPurchaseOrders,
		purchaseOrder,
		setPurchaseOrder,
		purchaseOrderToReceive,
		setPurchaseOrderToReceive,
		generalItems,
		setGeneralItems,
		receipts,
		setReceipts,
		updatePurchaseOrder,
		updateReceipt,
	};

	return (
		<PurchaseOrderContext.Provider value={data}>
			{children}
		</PurchaseOrderContext.Provider>
	);
};

export default PurchaseOrderProvider;
