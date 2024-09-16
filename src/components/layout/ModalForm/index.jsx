'use client';
import { Modal } from 'antd';
import useUiContext from '@/hooks/useUiContext';
import { UI_TYPES } from '@/context/ui/uiActions';

const { HIDE_MODAL_FORM } = UI_TYPES;

const ModalForm = () => {
	const {
		modalForm: { isOpen, title, children },
		dispatch,
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
			onCancel={() => dispatch({ type: HIDE_MODAL_FORM })}
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
