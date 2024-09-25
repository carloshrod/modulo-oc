import FormInvoice from '@/components/forms/FormInvoice';
import { UI_TYPES } from '@/context/ui/uiActions';
import useUiContext from '@/hooks/useUiContext';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbPencilMinus } from 'react-icons/tb';

const { SHOW_MODAL_FORM } = UI_TYPES;

const ActionsHistoryReceipts = ({ record }) => {
	const {
		showModalConfirm,
		showModalNotification,
		dispatch: uiDispatch,
	} = useUiContext();

	const isEditable = !record?.invoice_number;

	return (
		<Space size='small'>
			<Tooltip title='Ingresar factura'>
				<Button
					type='text'
					icon={
						<TbPencilMinus
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
					onClick={() =>
						showModalConfirm(
							() =>
								showModalNotification({
									notificationText: 'Recepción anulada exitosamente',
								}),
							{
								warning: true,
								title: '¿Deseas anular esta Recepción?',
								subtitle: 'Si anulas, esta recepción dejará de ser editable.',
								okText: 'Anular',
							},
						)
					}
					disabled={!isEditable}
				/>
			</Tooltip>
		</Space>
	);
};

export default ActionsHistoryReceipts;
