'use client';
import { Modal } from 'antd';
import useUiContext from '@/hooks/useUiContext';

const ModalForm = () => {
	const {
		modalForm: { isOpen, title, children },
		hideModalForm,
	} = useUiContext();

	return (
		<Modal
			open={isOpen}
			title={title}
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
