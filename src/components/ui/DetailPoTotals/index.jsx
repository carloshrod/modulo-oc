import { Col, Row } from 'antd';

const DetailPoTotals = ({ purchaseOrder }) => {
	return purchaseOrder?.total ? (
		<section>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>
					Total Neto
				</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					$
					{purchaseOrder.net_total
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</Col>
			</Row>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>IVA</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					$
					{purchaseOrder.iva
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</Col>
			</Row>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>Total</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					$
					{purchaseOrder.total
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</Col>
			</Row>
		</section>
	) : null;
};

export default DetailPoTotals;
