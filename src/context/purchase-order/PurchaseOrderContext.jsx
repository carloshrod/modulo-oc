'use client';
import { createContext, useEffect, useReducer, useState } from 'react';
import purchaseOrderReducers from './purchaseOrderReducers';

export const PurchaseOrderContext = createContext(undefined);

const initialState = {
	purchaseOrders: [],
	purchaseOrder: {},
	purchaseOrderToReceive: {},
	generalItems: [],
};

const PurchaseOrderProvider = ({ children }) => {
	const [state, dispatch] = useReducer(purchaseOrderReducers, initialState);
	const {
		purchaseOrders,
		purchaseOrder,
		purchaseOrderToReceive,
		generalItems,
	} = state;

	const [loggedUser, setLoggedUser] = useState({});

	useEffect(() => {
		const storedUser = localStorage.getItem('loggedUser');
		if (storedUser) {
			setLoggedUser(JSON.parse(storedUser));
		}
	}, []);

	const data = {
		loggedUser,
		setLoggedUser,
		purchaseOrders,
		purchaseOrder,
		purchaseOrderToReceive,
		generalItems,
		dispatch,
	};

	return (
		<PurchaseOrderContext.Provider value={data}>
			{children}
		</PurchaseOrderContext.Provider>
	);
};

export default PurchaseOrderProvider;
