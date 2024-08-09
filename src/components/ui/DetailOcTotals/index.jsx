import { Col, Row } from 'antd';

const DetailOcTotals = ({ purchaseOrder }) => {
	return purchaseOrder ? (
		<section>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>
					Total Neto
				</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					${purchaseOrder.net_total}
				</Col>
			</Row>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>IVA</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					${purchaseOrder.iva}
				</Col>
			</Row>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>Total</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					${purchaseOrder.total}
				</Col>
			</Row>
		</section>
	) : null;
};

export default DetailOcTotals;
