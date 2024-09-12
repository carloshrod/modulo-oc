'use client';
import { createContext, useReducer } from 'react';
import purchaseOrderReducers from './purchaseOrderReducers';
import { PO_TYPES } from './purchaseOrderActions';

const { GET_ALL_PURCHASE_ORDERS } = PO_TYPES;

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

	const getPurchaseOrders = payload => {
		dispatch({
			type: GET_ALL_PURCHASE_ORDERS,
			payload,
		});
	};

	const data = {
		purchaseOrders,
		getPurchaseOrders,
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
