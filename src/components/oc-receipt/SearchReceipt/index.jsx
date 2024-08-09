import { Button, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IoAdd } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import LayoutIcon from '../LayoutIcon';
import useOcContext from '@/hooks/useOcContext';
import { generateOcOptions } from '@/utils/utils';
import styles from './SearchReceipt.module.css';
import { useEffect } from 'react';
import InfoReceiptOC from '../InfoReceiptOC';

const SearchReceipt = ({ handleShow }) => {
	const { purchaseOrders, purchaseOrder, getPurchaseOrder } = useOcContext();

	useEffect(() => getPurchaseOrder(undefined), []);

	const onChange = value => {
		getPurchaseOrder(value);
	};

	return (
		<section className={styles.mainContainer}>
			<div className={styles.toolbar}>
				<Space>
					<span className={styles.searchLabel}>Buscar NºOC:</span>
					<Select
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
				<Button
					type='primary'
					ghost
					icon={<BiArrowBack size={20} />}
					iconPosition='start'
					size='large'
					onClick={handleShow}
				>
					Volver
				</Button>
			</div>
			{purchaseOrder?.oc_number ? (
				<InfoReceiptOC purchaseOrder={purchaseOrder} />
			) : (
				<section className={styles.receiptOcContainer}>
					<div>
						<LayoutIcon />
						<p>
							Busca una OC para ver el Detalle de Recepción o recibe una OC:
						</p>
						<Button type='primary' size='large' icon={<IoAdd size={30} />}>
							Recibir OC
						</Button>
					</div>
				</section>
			)}
		</section>
	);
};

export default SearchReceipt;
