import { useEffect } from 'react';
import { Button, Divider, Table, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import useGlobalContext from '@/hooks/useGlobalContext';
import DetailOcTotals from '@/components/ui/DetailOcTotals';
import styles from './InfoOC.module.css';
import useTableColumns from '@/hooks/useTableColumns';
import useOcContext from '@/hooks/useOcContext';

const InfoOC = () => {
	const {
		drawer: { title: ocNumber },
		hideDrawer,
		showModalNotification,
	} = useGlobalContext();
	const { purchaseOrder, getPurchaseOrder, approvalEvents, getApprovalEvents } =
		useOcContext();
	const { infoOcColumns } = useTableColumns();

	useEffect(() => {
		getPurchaseOrder(ocNumber);
		getApprovalEvents(purchaseOrder?.id);
	}, [ocNumber, purchaseOrder]);

	const EVENT_COLORS = {
		Aprobada: '#05A660',
		Rechazada: '#E53535',
	};

	const items = approvalEvents.map(event => ({
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
				dataSource={purchaseOrder?.items}
				pagination={false}
			/>
			<DetailOcTotals purchaseOrder={purchaseOrder} />
			<Divider orientation='left'>Hilo de Aprobación</Divider>
			{approvalEvents?.length > 0 ? (
				<Timeline items={items} />
			) : (
				<h3>Sin datos</h3>
			)}
			{purchaseOrder?.oc_status === 'En revisión' ? (
				<div className={styles.buttonsContainer}>
					<Button
						type='primary'
						size='large'
						onClick={() => {
							showModalNotification('OC aprobada exitosamente');
							hideDrawer();
						}}
					>
						Aprobar
					</Button>
					<Button
						danger
						size='large'
						onClick={() => {
							showModalNotification('OC rechazada exitosamente');
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
