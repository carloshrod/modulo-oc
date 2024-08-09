import { Button, Select, Space } from 'antd';
import LayoutIcon from '../LayoutIcon';
import styles from './SearchReceipt.module.css';
import { IoAdd } from 'react-icons/io5';
import { SearchOutlined } from '@ant-design/icons';
import { BiArrowBack } from 'react-icons/bi';
import { generateOcOptions } from '@/utils/utils';
import { ocData } from '@/utils/consts';
import { useState } from 'react';

const SearchReceipt = ({ handleShow }) => {
	const [oc, setOc] = useState({});

	const onChange = value => {
		const selectedOc = ocData.find(el => el.oc_number === value);
		setOc(selectedOc);
	};

	console.log(oc);

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
						options={generateOcOptions(ocData)}
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
			{oc?.oc_number ? (
				<section className={styles.infoOcContainer}>
					<h3>{oc.oc_name}</h3>
				</section>
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
