import { Button } from 'antd';
import { IoDownloadOutline } from 'react-icons/io5';
import styles from './OcPDF.module.css';

const OcPDF = () => {
	return (
		<>
			<div className={styles.pdfContainer}>
				<p style={{ fontSize: 30, fontWeight: 'bold' }}>PDF</p>
			</div>
			<div style={{ textAlign: 'end' }}>
				<Button
					style={{ backgroundColor: '#fff', fontWeight: 600 }}
					type='primary'
					ghost
					icon={<IoDownloadOutline size={20} />}
					iconPosition='end'
				>
					Descargar PDF
				</Button>
			</div>
		</>
	);
};

export default OcPDF;
