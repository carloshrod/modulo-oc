import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import useGlobalContext from './useGlobalContext';
import usePurchaseOrderContext from './usePurchaseOrderContext';
import useInputs from './useInputs';
import useGeneralItemsServices from '@/services/useGeneralItemsServices';
import { savePurchaseOrder } from '@/services/purchaseOrderServices';
import { env } from '@/config/env';

const useForm = () => {
	const [form] = Form.useForm();
	const [itemError, setItemError] = useState(false);
	const router = useRouter();
	const { showModalNotification, hideModalForm, loggedUser } =
		useGlobalContext();
	const { getPurchaseOrderToReceive } = usePurchaseOrderContext();
	const { ITEMS_INPUTS } = useInputs();
	const { createGeneralItem } = useGeneralItemsServices();
	console.log(loggedUser);

	const sendForApproval = async oeuvreId => {
		try {
			const values = await form.getFieldsValue(true);
			verifyItems(values);

			const purchaseOrderToApprove = {
				...values,
				oeuvre_id: oeuvreId,
				status: 'En revisión',
				submittedBy: loggedUser?.id,
			};

			const res = !values.id
				? await axios.post(
						`${env.API_URL}/purchase-orders`,
						purchaseOrderToApprove,
					)
				: await axios.put(
						`${env.API_URL}/purchase-orders/${values.id}`,
						purchaseOrderToApprove,
					);
			if (res.status === 200) {
				showModalNotification({
					notificationText: 'OC enviada a aprobación exitosamente',
				});
				router.back();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const sendForApprovalFailed = ({ values }) => {
		console.log(values);
		verifyItems(values);
	};

	const verifyItems = values => {
		const items = values.items || [];
		const isComplete = items.some(item => {
			return ITEMS_INPUTS.every(input => item[input.name]);
		});

		if (!isComplete) {
			setItemError(true);
			return;
		}

		setItemError(null);
	};

	const saveAsDraft = async oeuvreId => {
		try {
			const values = await form.getFieldsValue(true);
			const purchaseOrderToSave = {
				...values,
				oeuvre_id: oeuvreId,
				status: 'Borrador',
				submittedBy: loggedUser?.id,
			};

			const res = await savePurchaseOrder(purchaseOrderToSave);
			if (res.status === 200) {
				showModalNotification({
					notificationText: 'OC guardada como borrador exitosamente',
				});
				router.back();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onCancel = () => {
		setItemError(false);
		router.back();
	};

	const addInvoice = values => {
		console.log(values);
		hideModalForm();
		showModalNotification({
			notificationText: 'Factura ingresada exitosamente',
		});
	};

	const addItem = async values => {
		try {
			await createGeneralItem(values);
			hideModalForm();
			showModalNotification({
				notificationText: 'Artículo agregado exitosamente',
			});
		} catch (error) {
			console.error(error);
			hideModalForm();
			showModalNotification({
				notificationText: 'Error al agregar artículo',
				success: false,
			});
		}
	};

	const saveReceipt = values => {
		console.log('Guardando recepción!');
		console.log(values);
		showModalNotification({ notificationText: 'OC recibida exitosamente' });
		getPurchaseOrderToReceive(undefined);
	};

	return {
		form,
		itemError,
		sendForApproval,
		sendForApprovalFailed,
		saveAsDraft,
		onCancel,
		addInvoice,
		addItem,
		saveReceipt,
	};
};

export default useForm;
