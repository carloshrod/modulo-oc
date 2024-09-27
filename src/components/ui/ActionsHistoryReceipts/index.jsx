import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import FormInvoice from '@/components/forms/FormInvoice';
import useUiContext from '@/hooks/useUiContext';
import { UI_TYPES } from '@/context/ui/uiActions';
import {
	cancelReceipt,
	getPurchaseOrderByNumber,
} from '@/services/purchaseOrderServices';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';

const { SHOW_MODAL_FORM } = UI_TYPES;
const { GET_ONE_PURCHASE_ORDER, UPDATE_PURCHASE_ORDER, UPDATE_RECEIPT } =
	PO_TYPES;

const ActionsHistoryReceipts = ({ record }) => {
	const {
		showModalConfirm,
		showModalNotification,
		dispatch: uiDispatch,
	} = useUiContext();
	const { purchaseOrder, dispatch: poDispatch } = usePurchaseOrderContext();
	const isEditable = !record?.invoice_number && record?.status !== 'Anulada';

	const handleCancelReceipt = () => {
		showModalConfirm(
			async () => {
				const data = await cancelReceipt(record?.id);
				if (data) {
					poDispatch({
						type: UPDATE_RECEIPT,
						payload: {
							...record,
							status: 'Anulada',
						},
					});
					const { oeuvre_id, number } = purchaseOrder;
					const updatedPo = await getPurchaseOrderByNumber({
						oeuvreId: oeuvre_id,
						poNumber: number,
					});
					poDispatch({
						type: GET_ONE_PURCHASE_ORDER,
						payload: updatedPo,
					});
					poDispatch({
						type: UPDATE_PURCHASE_ORDER,
						payload: updatedPo,
					});
					showModalNotification({
						notificationText: data.message,
					});
				}
			},
			{
				warning: true,
				title: '¿Deseas anular esta Recepción?',
				subtitle: 'Si anulas, esta recepción dejará de ser editable.',
				okText: 'Anular',
			},
		);
	};

	return (
		<Space size='small'>
			<Tooltip title='Ingresar factura'>
				<Button
					type='text'
					icon={
						<IoDocumentTextOutline
							size={20}
							color={isEditable ? '#0D6EFD' : '#A0AEC0'}
						/>
					}
					onClick={() =>
						uiDispatch({
							type: SHOW_MODAL_FORM,
							payload: {
								title: 'Ingresar N° Factura',
								children: <FormInvoice receipt={record} />,
							},
						})
					}
					disabled={!isEditable}
				/>
			</Tooltip>
			<Tooltip title='Anular recepción'>
				<Button
					type='text'
					icon={
						<AiOutlineDelete
							size={20}
							color={isEditable ? '#E53535' : '#FCBABA'}
						/>
					}
					onClick={handleCancelReceipt}
					disabled={!isEditable}
				/>
			</Tooltip>
		</Space>
	);
};

export default ActionsHistoryReceipts;
