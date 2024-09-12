import { PO_TYPES } from './purchaseOrderActions';

const {
	GET_ALL_PURCHASE_ORDERS,
	GET_ONE_PURCHASE_ORDER,
	GET_PURCHASE_ORDER_TO_RECEIVE,
	UPDATE_PURCHASE_ORDER,
	DELETE_PURCHASE_ORDER,
	GET_ALL_GENERAL_ITEMS,
	CREATE_GENERAL_ITEM,
} = PO_TYPES;

const purchaseOrderReducers = (state, action) => {
	switch (action.type) {
		case GET_ALL_PURCHASE_ORDERS:
			return {
				...state,
				purchaseOrders: action.payload,
			};

		case GET_ONE_PURCHASE_ORDER:
			return {
				...state,
				purchaseOrder: action.payload,
			};

		case GET_PURCHASE_ORDER_TO_RECEIVE:
			return {
				...state,
				purchaseOrderToReceive: action.payload,
			};

		case UPDATE_PURCHASE_ORDER: {
			const { purchaseOrders } = state;
			const purchaseOrderToUpdate = action.payload;

			const newData = purchaseOrders.map(po =>
				po.id === purchaseOrderToUpdate.id ? purchaseOrderToUpdate : po,
			);

			return {
				...state,
				purchaseOrders: newData,
			};
		}

		case DELETE_PURCHASE_ORDER: {
			const { purchaseOrders } = state;
			const newData = purchaseOrders.filter(po => po.id !== action.payload);

			return {
				...state,
				purchaseOrders: newData,
			};
		}

		case GET_ALL_GENERAL_ITEMS: {
			return {
				...state,
				generalItems: action.payload,
			};
		}

		case CREATE_GENERAL_ITEM: {
			return {
				...state,
				generalItems: [action.payload, ...state.generalItems],
			};
		}

		default:
			return state;
	}
};

export default purchaseOrderReducers;
