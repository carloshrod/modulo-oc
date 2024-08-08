import { Table } from 'antd';
import styles from './Datatable.module.css';

const Datatable = ({ columns, dataSource, pagination = true }) => {
	return (
		<div className={styles.tableContainer}>
			<Table
				rowKey='id'
				columns={columns}
				dataSource={dataSource}
				pagination={pagination}
			/>
		</div>
	);
};

export default Datatable;
