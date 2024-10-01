/* eslint-disable new-cap */
import { useRef } from 'react';
import { Button } from 'antd';
import { IoDownloadOutline } from 'react-icons/io5';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PdfDocument from '../PdfDocument';
import styles from './PoPDF.module.css';

const PoPDFPreview = ({ poNumber }) => {
	const pdfRef = useRef();

	const handleExportPDF = () => {
		const element = pdfRef.current;
		html2canvas(element, {
			logging: true,
			letterRendering: 1,
			useCORS: true,
			scale: 2,
		}).then(canvas => {
			const imgWidth = 210;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			const imgData = canvas.toDataURL('img/png');
			const pdf = new jsPDF('p', 'mm', 'a4');
			const margin = 10;
			pdf.addImage(
				imgData,
				'PNG',
				margin,
				margin,
				imgWidth - margin * 2,
				imgHeight - margin * 2,
			);
			pdf.save(`${poNumber}.pdf`);
		});
	};

	return (
		<>
			<div className={styles.pdfContainer}>
				<PdfDocument pdfRef={pdfRef} />
			</div>
			<div style={{ textAlign: 'end' }}>
				<Button
					style={{ backgroundColor: '#fff', fontWeight: 600 }}
					type='primary'
					ghost
					icon={<IoDownloadOutline size={20} />}
					iconPosition='end'
					onClick={handleExportPDF}
				>
					Descargar PDF
				</Button>
			</div>
		</>
	);
};

export default PoPDFPreview;
