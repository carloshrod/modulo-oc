'use client';
import { Modal } from 'antd';
import useGlobalContext from '@/hooks/useGlobalContext';

const ModalForm = () => {
	const {
		modalForm: { modalFormOpen, children },
		hideModalForm,
	} = useGlobalContext();

	return (
		<Modal
			open={modalFormOpen}
			title='Ingresar N° Factura'
			okText='Agregar'
			cancelText='Cancelar'
			okButtonProps={{
				autoFocus: true,
				htmlType: 'submit',
			}}
			onCancel={hideModalForm}
			destroyOnClose
			centered
			width={450}
			footer={null}
		>
			{children}
		</Modal>
	);
};

export default ModalForm;
