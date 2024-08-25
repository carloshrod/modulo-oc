import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useGlobalContext from './useGlobalContext';
import useOcContext from './useOcContext';
import useInputs from './useInputs';
import useGeneralItemsServices from '@/services/useGeneralItemsServices';

const useForm = () => {
	const [form] = Form.useForm();
	const [itemError, setItemError] = useState(false);
	const router = useRouter();
	const { showModalNotification, hideModalForm } = useGlobalContext();
	const { getPurchaseOrderToReceive } = useOcContext();
	const { ITEMS_INPUTS } = useInputs();
	const { createGeneralItem } = useGeneralItemsServices();

	const sendForApproval = values => {
		console.log('Enviando a aprobación!');
		verifyItems(values);
		console.log(values);
		showModalNotification({
			notificationText: 'OC enviada a aprobación exitosamente',
		});
		router.back();
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

	const saveAsDraft = async () => {
		try {
			const values = await form.getFieldsValue(true);
			console.log('Datos guardados como borrador:', values);
			showModalNotification({
				notificationText: 'OC guardada como borrador exitosamente',
			});
		} catch (errorInfo) {
			console.error('Errores de validación:', errorInfo);
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
