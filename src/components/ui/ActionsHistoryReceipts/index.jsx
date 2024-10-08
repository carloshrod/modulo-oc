import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import FormInvoice from '@/components/forms/FormInvoice';
import useUiContext from '@/hooks/useUiContext';
import {
	cancelReceipt,
	getPurchaseOrderByNumber,
} from '@/services/purchaseOrderServices';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';

const ActionsHistoryReceipts = ({ record }) => {
	const { showModalConfirm, showModalNotification, showModalForm } =
		useUiContext();
	const {
		purchaseOrder,
		setPurchaseOrder,
		updatePurchaseOrder,
		updateReceipt,
	} = usePurchaseOrderContext();
	const isEditable = !record?.invoice_number && record?.status !== 'Anulada';

	const handleCancelReceipt = () => {
		showModalConfirm(
			async () => {
				const data = await cancelReceipt(record?.id);
				if (data) {
					updateReceipt({
						...record,
						status: 'Anulada',
					});
					const { oeuvre_id, number } = purchaseOrder;
					const updatedPo = await getPurchaseOrderByNumber({
						oeuvreId: oeuvre_id,
						poNumber: number,
					});
					setPurchaseOrder(updatedPo);
					updatePurchaseOrder(updatedPo);
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
						showModalForm({
							title: 'Ingresar N° Factura',
							children: <FormInvoice receipt={record} />,
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
