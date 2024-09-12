'use client';
import { createContext, useReducer, useState } from 'react';
import purchaseOrdersReducer from './purchaseOrdersReducers';
import { PO_TYPES } from './purchaseOrdersActions';

const { GET_ALL_PURCHASE_ORDERS } = PO_TYPES;

export const OcContext = createContext(undefined);

const initialState = {
	purchaseOrders: [],
	purchaseOrder: {},
	purchaseOrderToReceive: {},
};

const OcProvider = ({ children }) => {
	const [state, dispatch] = useReducer(purchaseOrdersReducer, initialState);
	const { purchaseOrders, purchaseOrder, purchaseOrderToReceive } = state;

	// TODO: reubicar generalItems state
	const [generalItems, setGeneralItems] = useState([]);

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
		setGeneralItems,
		dispatch,
	};

	return <OcContext.Provider value={data}>{children}</OcContext.Provider>;
};

export default OcProvider;
