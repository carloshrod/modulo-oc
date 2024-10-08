'use client';
import { Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrderServices';
import { generateOcOptions } from '@/utils/selectOptions';
import styles from './SearchInput.module.css';

const SearchInput = ({ oeuvreId }) => {
	const { purchaseOrders, purchaseOrderToReceive, setPurchaseOrderToReceive } =
		usePurchaseOrderContext();

	const onChange = async value => {
		if (value) {
			const data = await getPurchaseOrderByNumber({
				oeuvreId,
				poNumber: value,
			});
			setPurchaseOrderToReceive(data);
		} else {
			setPurchaseOrderToReceive({});
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
