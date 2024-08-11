import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ITEMS_INPUTS } from '@/utils/consts';
import useGlobalContext from './useGlobalContext';
import useOcContext from './useOcContext';

const useForm = obra => {
	const [form] = Form.useForm();
	const [itemError, setItemError] = useState(false);
	const router = useRouter();
	const { showModalNotification, hideModalForm } = useGlobalContext();
	const { getPurchaseOrder } = useOcContext();

	const sendForApproval = values => {
		console.log('Enviando a aprobación!');
		verifyItems(values);
		console.log(values);
		showModalNotification('OC enviada a aprobación exitosamente');
		router.push(`/orden-de-compra/${obra}`);
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
			showModalNotification('OC guardada como borrador exitosamente');
		} catch (errorInfo) {
			console.error('Errores de validación:', errorInfo);
		}
	};

	const onCancel = () => {
		setItemError(false);
		router.push(`/orden-de-compra/${obra}`);
	};

	const addInvoice = values => {
		console.log(values);
		hideModalForm();
		showModalNotification('Factura ingresada exitosamente');
	};

	const saveReceipt = values => {
		console.log('Guardando recepción!');
		console.log(values);
		showModalNotification('OC recibida exitosamente');
		getPurchaseOrder(undefined);
	};

	return {
		form,
		itemError,
		sendForApproval,
		sendForApprovalFailed,
		saveAsDraft,
		onCancel,
		addInvoice,
		saveReceipt,
	};
};

export default useForm;
