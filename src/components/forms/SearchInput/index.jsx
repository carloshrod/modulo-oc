'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrderServices';
import { generateOcOptions } from '@/utils/utils';
import { fetchData } from '@/services/utils';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';
import styles from './SearchInput.module.css';

const { GET_ALL_PURCHASE_ORDERS, GET_PURCHASE_ORDER_TO_RECEIVE } = PO_TYPES;

const SearchInput = () => {
	const { purchaseOrders, purchaseOrderToReceive, dispatch } =
		usePurchaseOrderContext();
	const { slug } = useParams();

	const getApprovedOrdersByOeuvre = async () => {
		const oeuvre = await fetchData(`/oeuvres/${slug}`);
		const data = await fetchData(`/purchase-orders/${oeuvre?.id}`);
		const approvedOrders =
			data?.length > 0 && data.filter(po => po.status === 'Aprobada');
		dispatch({
			type: GET_ALL_PURCHASE_ORDERS,
			payload: approvedOrders,
		});
	};

	useEffect(() => {
		getApprovedOrdersByOeuvre();
	}, []);

	const onChange = async value => {
		if (value) {
			const data = await getPurchaseOrderByNumber({ poNumber: value });
			dispatch({ type: GET_PURCHASE_ORDER_TO_RECEIVE, payload: data });
		} else {
			dispatch({ type: GET_PURCHASE_ORDER_TO_RECEIVE, payload: {} });
		}
	};

	return (
		<Space>
			<span className={styles.searchLabel}>Seleccionar NºOC:</span>
			<Select
				defaultValue={purchaseOrderToReceive?.number}
				placeholder='Ej: OC-331-32'
				optionFilterProp='label'
				suffixIcon={<SearchOutlined style={{ fontSize: 16 }} />}
				onChange={onChange}
				options={generateOcOptions(purchaseOrders)}
				showSearch
				allowClear
				style={{ width: 200 }}
			/>
		</Space>
	);
};

export default SearchInput;
