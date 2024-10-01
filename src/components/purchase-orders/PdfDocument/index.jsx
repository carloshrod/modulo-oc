import Image from 'next/image';
import moment from 'moment';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import styles from './PdfDocument.module.css';
import PdfTable from '../PdfTable';

const PdfDocument = ({ pdfRef }) => {
	const { purchaseOrder } = usePurchaseOrderContext();
	const { oeuvre, number, approval_date, supplier_name, supplier_rut } =
		purchaseOrder;

	const supplierInfoLeft = [
		{
			label: 'SEÑOR(ES)',
			value: supplier_name.toUpperCase(),
		},
		{
			label: 'DIRECCIÓN',
			value: 'CALLE 123',
		},
		{
			label: 'RUT',
			value: supplier_rut,
		},
		{
			label: 'GIRO',
			value: '',
		},
	];

	const supplierInfoRight = [
		{
			label: 'ATENCIÓN',
			value: 'PAULA CORTES',
		},
		{
			label: 'FONO',
			value: '+56981561739',
		},
		{
			label: 'MAIL',
			value: 'paula.cortes.pinto@gmail.com',
		},
		{
			label: 'COTIZACIÓN',
			value: '',
		},
		{
			label: 'FORMA PAGO',
			value: 'Contra recepción de factura, a 30 días',
		},
	];

	const bottomInfoLeft = [
		{
			label: 'R. SOCIAL',
			value: oeuvre.company?.business_name,
		},
		{
			label: 'RUT',
			value: oeuvre.company?.rut,
		},
		{
			label: 'GIRO',
			value: 'Terminación y acabado de edificios',
		},
		{
			label: 'DIRECCIÓN',
			value: 'Alonso de Córdova 5151',
		},
		{
			label: 'FONO',
			value: '+56-2-3246652',
		},
		{
			label: 'EMAIL',
			value: 'contacto@constructoraicc.cl',
		},
		{
			label: 'ENVIO XML',
			value: 'terceros-7709@dte.iconstruye.com',
		},
	];

	const bottomInfoRight = [
		{
			label: 'OBRA',
			value: oeuvre.oeuvre_name,
		},
		{
			label: 'DIR. DESPACHO',
			value: oeuvre.oeuvre_address,
		},
		{
			label: 'COMUNA',
			value: 'Quilicura',
		},
		{
			label: 'CIUDAD',
			value: 'Santiago',
		},
		{
			label: 'CONTACTO',
			value: 'Bonnie Yaque',
		},
		{
			label: 'FONO',
			value: '+56-2-3246652',
		},
	];

	return (
		<div ref={pdfRef} className={styles.pdf}>
			<section className={styles.header}>
				<Image
					src={oeuvre.company.image_url}
					width={60}
					height={60}
					alt='Logo de empresa'
				/>
				<h3>Obra: {oeuvre.oeuvre_name}</h3>
			</section>
			<h2>ORDEN DE COMPRA N° {number}</h2>
			<h5>APROBADA EL {moment(approval_date).format('DD-MM-YYYY')}</h5>
			<section className={styles.supplierInfo}>
				<div className={styles.left}>
					{supplierInfoLeft.map(el => (
						<span key={el.label} className={styles.row}>
							<span className={styles.label}>{el.label}</span>
							<span>:</span>
							<p>{el.value}</p>
						</span>
					))}
				</div>
				<div className={styles.right}>
					{supplierInfoRight.map(el => (
						<span key={el.label} className={styles.row}>
							<span className={styles.label}>{el.label}</span>
							<span>:</span>
							<p>{el.value}</p>
						</span>
					))}
				</div>
			</section>

			<PdfTable purchaseOrder={purchaseOrder} />

			<section className={styles.bottomInfo}>
				<div className={styles.left}>
					<p className={styles.subtitle}>DATOS FACTURACIÓN</p>
					{bottomInfoLeft.map(el => (
						<span key={el.label} className={styles.row}>
							<span className={styles.label}>{el.label}</span>
							<span>:</span>
							<p>{el.value}</p>
						</span>
					))}
					<div style={{ marginTop: 16 }}>
						<span style={{ fontWeight: 700 }}>ADMINISTRADOR OBRA :</span>
						<p>{oeuvre.admin_name}</p>
					</div>
				</div>
				<div className={styles.right}>
					<p className={styles.subtitle}>DATOS DESPACHO</p>
					{bottomInfoRight.map(el => (
						<span key={el.label} className={styles.row}>
							<span className={styles.label}>{el.label}</span>
							<span>:</span>
							<p>{el.value}</p>
						</span>
					))}
					<div style={{ marginTop: 16 }}>
						<span style={{ fontWeight: 700 }}>GERENTE OPERACIONES :</span>
						<p>GERARDO ANDRADE</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PdfDocument;
