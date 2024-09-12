import { useEffect } from 'react';
import { Badge, Button, Divider, Table, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import useGlobalContext from '@/hooks/useGlobalContext';
import DetailOcTotals from '@/components/ui/DetailOcTotals';
import styles from './InfoOC.module.css';
import useTableColumns from '@/hooks/useTableColumns';
import useOcContext from '@/hooks/useOcContext';
import {
	getPurchaseOrderByNumber,
	sendPurchaseOrderForApprove,
} from '@/services/purchaseOrdersServices';
import moment from 'moment';
import { PO_TYPES } from '@/context/OC/purchaseOrdersActions';

const { GET_ONE_PURCHASE_ORDER, UPDATE_PURCHASE_ORDER } = PO_TYPES;

const InfoOC = () => {
	const {
		drawer: { title: poNumber },
		hideDrawer,
		showModalNotification,
		loggedUser,
	} = useGlobalContext();
	const { purchaseOrder, dispatch } = useOcContext();
	const { infoOcColumns } = useTableColumns();

	const fetchPurchaseOrder = async () => {
		const data = await getPurchaseOrderByNumber({ poNumber });
		dispatch({
			type: GET_ONE_PURCHASE_ORDER,
			payload: data,
		});
	};

	useEffect(() => {
		fetchPurchaseOrder();
	}, [poNumber, purchaseOrder?.id]);

	const handleApproval = async () => {
		const data = await sendPurchaseOrderForApprove({
			poId: purchaseOrder.id,
			submittedBy: loggedUser.id,
		});
		if (data) {
			console.log(data);
			dispatch({
				type: UPDATE_PURCHASE_ORDER,
				payload: data.purchaseOrder,
			});
			showModalNotification({
				notificationText: data.message,
			});
			hideDrawer();
		}
	};

	const EVENT_COLORS = {
		Aprobada: '#05A660',
		Rechazada: '#E53535',
	};

	const items = purchaseOrder?.events?.map((event, index) => ({
		dot: event.status === 'Envío a aprobación' ? <ClockCircleOutlined /> : null,
		color: EVENT_COLORS[event.status] ?? '#899197',
		children: (
			<div style={{ fontWeight: 500 }}>
				<p>{event.status}</p>
				<div style={{ fontSize: 12, color: '#899197' }}>
					{index !== 0 &&
					event?.approver_details?.approver_role !== 'approver4' ? (
						<Badge
							color='blue'
							text={`Aprobado parcialmente por:`}
							style={{ fontSize: 12, color: '#899197' }}
						/>
					) : null}
					<p>{event?.user?.full_name}</p>
					<p>
						{event?.created_at &&
							moment(event?.created_at).startOf('day').format('YYYY/MM/DD')}
					</p>
				</div>
			</div>
		),
	}));

	return (
		<section className={styles.infoOC}>
			<Divider orientation='left'>Detalle OC</Divider>
			<Table
				rowKey='id'
				columns={infoOcColumns}
				dataSource={purchaseOrder?.items}
				pagination={false}
			/>
			<DetailOcTotals purchaseOrder={purchaseOrder} />
			<Divider orientation='left'>Hilo de Aprobación</Divider>
			{purchaseOrder?.events?.length > 0 ? (
				<Timeline items={items} />
			) : (
				<h3>Sin datos</h3>
			)}
			{purchaseOrder?.current_approver === loggedUser?.id &&
			purchaseOrder?.status === 'En revisión' ? (
				<div className={styles.buttonsContainer}>
					<Button type='primary' size='large' onClick={handleApproval}>
						Aprobar
					</Button>
					<Button
						danger
						size='large'
						onClick={() => {
							showModalNotification({
								notificationText: 'OC rechazada exitosamente',
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
