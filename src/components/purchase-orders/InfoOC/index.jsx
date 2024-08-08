import { useEffect, useState } from 'react';
import { Button, Divider, Table, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import useGlobalContext from '@/hooks/useGlobalContext';
import { ocApprovalEvents, ocData } from '@/utils/consts';
import DetailOcTotals from '@/components/ui/DetailOcTotals';
import styles from './InfoOC.module.css';
import useTableColumns from '@/hooks/useTableColumns';

const InfoOC = () => {
	const [data, setData] = useState([]);
	const [oc, setOc] = useState([]);
	const [events, setEvents] = useState([]);
	const {
		drawer: { title: ocNumber },
		hideDrawer,
		showModalNotification,
	} = useGlobalContext();
	const { infoOcColumns } = useTableColumns();

	useEffect(() => {
		const foundedOc = ocData.find(el => {
			return el.oc_number === ocNumber;
		});

		if (foundedOc) {
			const eventsFounded = ocApprovalEvents.filter(el => {
				return el.oc_id === foundedOc.id;
			});

			setOc(foundedOc);
			setData(foundedOc.items);
			setEvents(eventsFounded);
		}
	}, [ocNumber]);

	const EVENT_COLORS = {
		Aprobada: '#05A660',
		Rechazada: '#E53535',
	};

	const items = events.map(event => ({
		dot:
			event.event_status === 'Envío a aprobación' ? (
				<ClockCircleOutlined />
			) : null,
		color: EVENT_COLORS[event.event_status] ?? '#899197',
		children: (
			<div style={{ fontWeight: 500 }}>
				<p>{event.event_status}</p>
				<div style={{ fontSize: 12, color: '#899197' }}>
					<p>{event.aprobador}</p>
					<p>{event.event_date}</p>
				</div>
			</div>
		),
	}));

	return (
		<section className={styles.infoOC}>
			<Divider orientation='left'>Detalle OC</Divider>
			<Table
				rowKey='sku'
				columns={infoOcColumns}
				dataSource={data}
				pagination={false}
			/>
			<DetailOcTotals oc={oc} />
			<Divider orientation='left'>Hilo de Aprobación</Divider>
			{events?.length > 0 ? <Timeline items={items} /> : <h3>Sin datos</h3>}
			{oc.oc_status === 'En revisión' ? (
				<div className={styles.buttonsContainer}>
					<Button
						type='primary'
						size='large'
						onClick={() => {
							showModalNotification({
								successText: 'OC aprobada exitosamente',
							});
							hideDrawer();
						}}
					>
						Aprobar
					</Button>
					<Button
						danger
						size='large'
						onClick={() => {
							showModalNotification({
								successText: 'OC rechazada exitosamente',
							});
							hideDrawer();
						}}
					>
						Rechazar
					</Button>
				</div>
			) : null}
		</section>
	);
};

export default InfoOC;
