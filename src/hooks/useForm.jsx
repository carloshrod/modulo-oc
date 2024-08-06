import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { ITEMS_INPUTS } from '@/utils/consts';
import useGlobalContext from './useGlobalContext';

const useForm = obra => {
	const [form] = Form.useForm();
	const [itemError, setItemError] = useState(false);
	const router = useRouter();
	const { showModalConfirm, showModalNotification } = useGlobalContext();

	const onFinish = values => {
		console.log('Enviando formulario!');
		verifyItems(values);
		showModalNotification({
			successText: 'OC enviada a aprobación exitosamente',
		});
		form.resetFields();
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
			icon: {
				bgColor: '#0D6EFD',
				component: <IoNotificationsOutline size={38} color='#FFEBEB' />,
			},
		});
	};

	const saveAsDraft = async () => {
		try {
			const values = await form.getFieldsValue(true);
			console.log('Datos guardados como borrador:', values);
			showModalNotification({
				successText: 'OC guardada como borrador exitosamente',
			});
		} catch (errorInfo) {
			console.error('Errores de validación:', errorInfo);
		}
	};

	const onCancel = () => {
		form.resetFields();
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
