import { Col, Row } from 'antd';

const DetailOcTotals = ({ oc }) => {
	return (
		<section>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>
					Total Neto
				</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					${oc.net_total}
				</Col>
			</Row>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>IVA</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					${oc.iva}
				</Col>
			</Row>
			<Row justify='end'>
				<Col style={{ padding: 16, fontSize: 12, fontWeight: 500 }}>Total</Col>
				<Col style={{ width: 100, padding: 16, fontSize: 12, fontWeight: 500 }}>
					${oc.total}
				</Col>
			</Row>
		</section>
	);
};

export default DetailOcTotals;
