import { useEffect, useState } from 'react';
import { Button, Col, Divider, Row, Table, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import useGlobalContext from '@/hooks/useGlobalContext';
import { ocData } from '@/utils/consts';

const InfoOC = () => {
	const [data, setData] = useState([]);
	const [oc, setOc] = useState([]);
	const {
		drawer: { title: ocNumber },
		hideDrawer,
		showModalNotification,
	} = useGlobalContext();

	useEffect(() => {
		const foundedOc = ocData.find(el => {
			return el.oc_number === ocNumber;
		});

		if (foundedOc) {
			setOc(foundedOc);
			setData(foundedOc.items);
		}
	}, [ocNumber]);

	const columns = [
		{
			title: 'DETALLE ARTÍCULO',
			dataIndex: 'sku',
			key: 'sku',
			render: (_, record) => (
				<div>
					<p style={{ fontSize: 14, color: '#0D6EFD' }}>
						{record.sku} ({record.measurement_unit})
					</p>
					<p>{record.description}</p>
					<p>{record.gloss}</p>
					<p>{record.cost_account}</p>
				</div>
			),
		},
		{
			title: 'CANTIDAD',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'PU',
			dataIndex: 'unit_price',
			key: 'unit_price',
			width: 70,
			render: (_, record) => <p>${record.unit_price}</p>,
		},
		{
			title: 'SUBTOTAL',
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 100,
			render: (_, record) => <p>${record.subtotal}</p>,
		},
	];

	return (
		<section>
			<Divider orientation='left'>Detalle OC</Divider>
			<Table
				rowKey='sku'
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
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
			<Divider orientation='left'>Hilo de Aprobación</Divider>
			<Timeline
				items={[
					{
						dot: <ClockCircleOutlined className='timeline-clock-icon' />,
						color: '#899197',
						children: (
							<div style={{ fontWeight: 500 }}>
								<p>Envío a aprobación</p>
								<div style={{ fontSize: 12, color: '#899197' }}>
									<p>Nombre Apellido</p>
									<p>XX/XX/XX</p>
								</div>
							</div>
						),
					},
					{
						color: '#E53535',
						children: (
							<div style={{ fontWeight: 500 }}>
								<p>Rechazada</p>
								<div style={{ fontSize: 12, color: '#899197' }}>
									<p>Nombre Apellido</p>
									<p>XX/XX/XX</p>
								</div>
							</div>
						),
					},
					{
						dot: <ClockCircleOutlined className='timeline-clock-icon' />,
						color: '#899197',
						children: (
							<div style={{ fontWeight: 500 }}>
								<p>Envío a aprobación</p>
								<div style={{ fontSize: 12, color: '#899197' }}>
									<p>Nombre Apellido</p>
									<p>XX/XX/XX</p>
								</div>
							</div>
						),
					},
				]}
			/>
			<div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
				<Button
					type='primary'
					size='large'
					style={{ width: 180, borderRadius: 0 }}
					onClick={() => {
						showModalNotification({ successText: 'OC aprobada exitosamente' });
						hideDrawer();
					}}
				>
					Aprobar
				</Button>
				<Button
					danger
					size='large'
					style={{ width: 180, borderRadius: 0 }}
					onClick={() => {
						showModalNotification({ successText: 'OC rechazada exitosamente' });
						hideDrawer();
					}}
				>
					Rechazar
				</Button>
			</div>
		</section>
	);
};

export default InfoOC;
