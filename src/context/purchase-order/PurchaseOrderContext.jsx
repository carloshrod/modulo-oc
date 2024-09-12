'use client';
import { createContext, useReducer } from 'react';
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

	const data = {
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
