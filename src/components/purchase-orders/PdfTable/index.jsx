import styles from './PdfTable.module.css';

const PdfTable = ({ purchaseOrder }) => {
	const {
		items,
		currency_type,
		exchange_rate,
		net_total,
		discount,
		total_receipt_discount,
		iva,
		total,
	} = purchaseOrder;

	return (
		<div className={styles.tableContainer}>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>CODIGO</th>
						<th>CANT.</th>
						<th>DESCRIPCIÓN</th>
						<th>CTA. DE COSTO</th>
						<th>UD</th>
						<th>P. UNITARIO</th>
						<th>DCTO</th>
						<th>TOTAL</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => (
						<tr key={item.id}>
							<td>{index + 1}</td>
							<td>{item.item_sku}</td>
							<td>{item.quantity}</td>
							<td>{item.description}</td>
							<td>{item.account_cost_identifier}</td>
							<td>Global</td>
							<td>{item.unit_price}</td>
							<td>0</td>
							<td>{item.subtotal}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td rowSpan='6' colSpan='5'>
							<div className={styles.notes}>
								<div>NOTAS:</div>
								<div>
									<div>MONEDA: {currency_type}</div>
									<div>CAMBIO: ${exchange_rate}</div>
								</div>
							</div>
						</td>
						<td colSpan='3'>Subtotal</td>
						<td>{net_total}</td>
					</tr>
					<tr>
						<td colSpan='3'>Cargos</td>
						<td>0</td>
					</tr>
					<tr>
						<td colSpan='3'>Descuentos</td>
						<td>{parseFloat(discount) + parseFloat(total_receipt_discount)}</td>
					</tr>
					<tr>
						<td colSpan='3'>IVA 19,00%</td>
						<td>{iva}</td>
					</tr>
					<tr>
						<td colSpan='3'>Total</td>
						<td>{total}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default PdfTable;
