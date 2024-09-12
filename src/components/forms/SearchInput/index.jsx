'use client';
import { Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchInput.module.css';
import useOcContext from '@/hooks/useOcContext';
import { generateOcOptions } from '@/utils/utils';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrdersServices';
import { PO_TYPES } from '@/context/OC/purchaseOrdersActions';
import { fetchData } from '@/services/utils';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const { GET_PURCHASE_ORDER_TO_RECEIVE } = PO_TYPES;

const SearchInput = () => {
	const {
		purchaseOrders,
		getPurchaseOrders,
		purchaseOrderToReceive,
		dispatch,
	} = useOcContext();
	const { slug } = useParams();

	const getApprovedOrdersByOeuvre = async () => {
		const oeuvre = await fetchData(`/oeuvres/${slug}`);
		const data = await fetchData(`/purchase-orders/${oeuvre?.id}`);
		const approvedOrders = data.filter(po => po.status === 'Aprobada');
		getPurchaseOrders(approvedOrders);
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
