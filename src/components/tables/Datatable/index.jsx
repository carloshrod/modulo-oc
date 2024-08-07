import { Table } from 'antd';
import styles from './Datatable.module.css';

const Datatable = ({ columns, dataSource }) => {
	return (
		<div className={styles.tableContainer}>
			<Table columns={columns} dataSource={dataSource} />
		</div>
	);
};

export default Datatable;
