import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useUiContext from './useUiContext';
import usePurchaseOrderContext from './usePurchaseOrderContext';
import useInputs from './useInputs';
import {
	createGeneralItem,
	SendPoForApproveFromForm,
	savePurchaseOrder,
	rejectPurchaseOrder,
	receivePurchaseOrder,
	addInvoice,
} from '@/services/purchaseOrderServices';
import { validateItemReceipts, validatePoItems } from '@/utils/purchaseOrder';
import { generateFormData } from './generateFormData';

const useForm = () => {
	const [form] = Form.useForm();
	const [itemError, setItemError] = useState(false);
	const router = useRouter();
	const { showModalNotification, hideDrawer, hideModalForm } = useUiContext();
	const {
		loggedUser,
		generalItems,
		setGeneralItems,
		updatePurchaseOrder,
		updateReceipt,
	} = usePurchaseOrderContext();
	const { ITEMS_INPUTS } = useInputs();

	const sendForApproval = async oeuvreId => {
		try {
			const values = await form.getFieldsValue(true);
			const filesToKeep = [];
			values?.attachments?.map(file => {
				return 'id' in file && filesToKeep.push(file.id);
			});

			const purchaseOrderToApprove = {
				...values,
				oeuvre_id: oeuvreId,
				submittedBy: loggedUser?.id,
				status: 'En revisión',
				discount: values?.discount ?? 0,
				filesToKeep,
			};

			const formData = generateFormData(purchaseOrderToApprove);
			const res = await SendPoForApproveFromForm(formData, values?.id);

			if (res.status === 200) {
				showModalNotification({
					notificationText: res.data.message,
				});
				router.back();
			}
		} catch (error) {
			console.error(error);
			const errorMessage =
				error?.response?.data?.message ?? 'Ocurrió un error inesperado';
			showModalNotification({
				success: false,
				notificationText: errorMessage,
			});
		}
	};

	const sendForApprovalFailed = ({ values }) => {
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
			const validItems = validatePoItems(values?.items);

			const filesToKeep = [];
			values?.attachments?.map(file => {
				return 'id' in file && filesToKeep.push(file.id);
			});

			const purchaseOrder = {
				...values,
				oeuvre_id: oeuvreId,
				submittedBy: loggedUser?.id,
				status: 'Borrador',
				items: validItems,
				filesToKeep,
			};

			const formData = generateFormData(purchaseOrder);
			const res = await savePurchaseOrder(formData, values?.id);

			if (res.status === 200) {
				showModalNotification({
					notificationText: 'OC guardada como borrador exitosamente',
				});
				router.back();
			}
		} catch (error) {
			console.error(error);
			const errorMessage =
				error?.response?.data?.message ?? 'Ocurrió un error inesperado';
			showModalNotification({
				success: false,
				notificationText: errorMessage,
			});
		}
	};

	const rejectPo = async (purchaseOrderId, rejectedBy) => {
		try {
			const values = await form.getFieldsValue(true);

			const data = await rejectPurchaseOrder(purchaseOrderId, {
				rejectedBy,
				comments: values.comments,
			});

			if (data) {
				updatePurchaseOrder(data?.purchaseOrder);
				hideModalForm();
				showModalNotification({
					notificationText: data.message,
				});
				hideDrawer();
			}
		} catch (error) {
			console.error(error);
			const errorMessage =
				error?.response?.data?.message ?? 'Ocurrió un error inesperado';
			showModalNotification({
				success: false,
				notificationText: errorMessage,
			});
		}
	};

	const onCancel = () => {
		setItemError(false);
		router.back();
	};

	const submitInvoice = async receipt => {
		try {
			const values = await form.getFieldsValue(true);
			const data = await addInvoice(receipt?.id, values);
			if (data) {
				updateReceipt({
					...receipt,
					invoice_number: values.invoice_number,
					status: 'Recepción con factura',
				});
				hideModalForm();
				showModalNotification({
					notificationText: data?.message,
				});
			}
		} catch (error) {
			console.error(error);
			showModalNotification({
				notificationText:
					error?.response?.data?.message ?? 'Error al agregar artículo',
				success: false,
			});
		}
	};

	const addItem = async values => {
		try {
			const itemToCreate = { ...values, user_create: loggedUser?.id };
			const data = await createGeneralItem(itemToCreate);
			if (data) {
				setGeneralItems([data, ...generalItems]);
				hideModalForm();
				showModalNotification({
					notificationText: 'Artículo agregado exitosamente',
				});
			}
		} catch (error) {
			console.error(error);
			showModalNotification({
				notificationText:
					error?.response?.data?.message ?? 'Error al agregar artículo',
				success: false,
			});
		}
	};

	const saveReceipt = async values => {
		try {
			const { items, receipt_date, doc_type, doc_number, net_total } = values;
			if (!validateItemReceipts(items)) {
				return showModalNotification({
					notificationText:
						'La cantidad y el monto de al menos uno de los artículos debe ser mayor a cero',
					success: false,
				});
			}
			const res = await receivePurchaseOrder({
				items,
				receipt_date,
				doc_type,
				doc_number,
				discount: values?.discount || 0,
				net_total,
			});
			if (res.status === 200) {
				showModalNotification({ notificationText: res.data.message });
				router.back();
			}
		} catch (error) {
			console.error(error);
			showModalNotification({
				notificationText:
					error?.response?.data?.message ?? 'Error al recibir OC',
				success: false,
			});
		}
	};

	return {
		form,
		itemError,
		sendForApproval,
		sendForApprovalFailed,
		saveAsDraft,
		rejectPo,
		onCancel,
		submitInvoice,
		addItem,
		saveReceipt,
	};
};

export default useForm;
