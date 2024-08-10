import { Form } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ITEMS_INPUTS } from '@/utils/consts';
import useGlobalContext from './useGlobalContext';

const useForm = obra => {
	const [form] = Form.useForm();
	const [itemError, setItemError] = useState(false);
	const router = useRouter();
	const { showModalConfirm, showModalNotification } = useGlobalContext();
	const params = useParams();
	console.log(params?.oc_number);

	const onFinish = values => {
		console.log('Enviando formulario!');
		verifyItems(values);
		console.log(values);
		showModalNotification('OC enviada a aprobación exitosamente');
		if (params?.oc_number) {
			router.push(`/orden-de-compra/${obra}`);
		} else {
			form.resetFields();
		}
	};

	const onFinishFailed = ({ values }) => {
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

	const handleSubmit = () => {
		showModalConfirm(() => form.submit(), {
			title: '¿Deseas enviar OC a aprobación?',
			subtitle:
				'Se enviará un correo a los aprobadores responsables para revisar tu OC.',
			okText: 'Aceptar',
		});
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

	return {
		form,
		itemError,
		onFinish,
		onFinishFailed,
		handleSubmit,
		saveAsDraft,
		onCancel,
	};
};

export default useForm;
