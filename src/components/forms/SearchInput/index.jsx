'use client';
import { Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchInput.module.css';
import useOcContext from '@/hooks/useOcContext';
import { generateOcOptions } from '@/utils/utils';

const SearchInput = () => {
	const { purchaseOrders, purchaseOrderToReceive, getPurchaseOrderToReceive } =
		useOcContext();

	const onChange = value => {
		getPurchaseOrderToReceive(value);
	};

	return (
		<Space>
			<span className={styles.searchLabel}>Seleccionar NºOC:</span>
			<Select
				defaultValue={purchaseOrderToReceive?.oc_number}
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
