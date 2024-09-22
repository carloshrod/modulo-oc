import { useEffect } from 'react';
import { Badge, Button, Divider, Table, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import DetailPoTotals from '@/components/ui/DetailPoTotals';
import useUiContext from '@/hooks/useUiContext';
import useTableColumns from '@/hooks/useTableColumns';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import {
	getPurchaseOrderByNumber,
	sendPurchaseOrderForApprove,
} from '@/services/purchaseOrderServices';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';
import styles from './InfoPurchaseOrder.module.css';
import { UI_TYPES } from '@/context/ui/uiActions';
import FormRejectPo from '@/components/forms/FormRejectPo';

const { HIDE_DRAWER, SHOW_MODAL_FORM } = UI_TYPES;
const { GET_ONE_PURCHASE_ORDER, UPDATE_PURCHASE_ORDER } = PO_TYPES;

const InfoPurchaseOrder = () => {
	const {
		drawer: { title: poNumber },
		showModalNotification,
		dispatch: uiDispatch,
	} = useUiContext();
	const {
		loggedUser,
		purchaseOrder,
		dispatch: poDispatch,
	} = usePurchaseOrderContext();
	const { infoPoColumns } = useTableColumns();

	const fetchPurchaseOrder = async () => {
		const data = await getPurchaseOrderByNumber({ poNumber });
		poDispatch({
			type: GET_ONE_PURCHASE_ORDER,
			payload: data,
		});
	};

	useEffect(() => {
		fetchPurchaseOrder();
	}, [poNumber, purchaseOrder?.id]);

	const handleApproval = async () => {
		const data = await sendPurchaseOrderForApprove({
			purchaseOrderId: purchaseOrder.id,
			submittedBy: loggedUser.id,
		});
		if (data) {
			poDispatch({
				type: UPDATE_PURCHASE_ORDER,
				payload: data.purchaseOrder,
			});
			showModalNotification({
				notificationText: data.message,
			});
			uiDispatch({ type: HIDE_DRAWER });
		}
	};

	const handleRejection = () => {
		uiDispatch({
			type: SHOW_MODAL_FORM,
			payload: {
				title: 'Rechazar OC',
				children: <FormRejectPo purchaseOrderId={purchaseOrder.id} />,
			},
		});
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
					{event.status === 'Envío a aprobación' &&
					event?.approver_details?.approver_role &&
					event?.approver_details?.approver_role !== 'approver4' ? (
						<Badge
							color='blue'
							text={`Aprobado parcialmente por:`}
							style={{ fontSize: 12, color: '#899197' }}
						/>
					) : null}
					<p>{event?.user?.full_name}</p>
					{event?.comments ? (
						<Badge
							color='grey'
							text={`Comentarios: ${event?.comments}`}
							style={{ fontSize: 12, color: '#899197' }}
						/>
					) : null}
					<p>
						{event?.created_at &&
							moment(event?.created_at).startOf('day').format('YYYY/MM/DD')}
					</p>
				</div>
			</div>
		),
	}));

	return (
		<section className={styles.infoPo}>
			<Divider orientation='left'>Detalle OC</Divider>
			<Table
				rowKey='id'
				columns={infoPoColumns}
				dataSource={purchaseOrder?.items}
				pagination={false}
			/>
			<DetailPoTotals purchaseOrder={purchaseOrder} />
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
					<Button danger size='large' onClick={handleRejection}>
						Rechazar
					</Button>
				</div>
			) : null}
		</section>
	);
};

export default InfoPurchaseOrder;
