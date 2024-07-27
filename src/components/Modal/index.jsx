import useGlobalContext from '@/hooks/useGlobalContext';
import { Modal } from 'antd';

const CustomModal = () => {
	const {
		modal: { modalOpen, danger, okText, confirmed, successText, icon },
		hideModal,
		showModalNotification,
	} = useGlobalContext();

	const handleConfirm = () => {
		showModalNotification({
			successText: 'Orden de compra eliminada exitosamente',
		});
	};

	return (
		<Modal
			closeIcon={false}
			centered
			open={modalOpen}
			onOk={handleConfirm}
			onCancel={hideModal}
			cancelButtonProps={{ size: 'large', type: 'primary', ghost: true }}
			cancelText='Cancelar'
			okButtonProps={{ size: 'large', type: 'primary', danger }}
			okText={okText}
			footer={confirmed ? null : undefined}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: confirmed && 40,
					marginBottom: 40,
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 16,
						backgroundColor: icon.bgColor,
						height: 80,
						width: 80,
						borderRadius: 999,
					}}
				>
					{icon.component}
				</div>
				{!confirmed ? (
					<>
						<h4 style={{ fontSize: 24, fontWeight: 500 }}>
							¿Deseas eliminar esta Orden de Compra?
						</h4>
						<p style={{ fontSize: 16, fontWeight: 500, color: '#87898E' }}>
							Si eliminas no podrás recuperar los datos
						</p>
					</>
				) : (
					<h4 style={{ fontSize: 24, fontWeight: 500, color: '#05A660' }}>
						{successText}
					</h4>
				)}
			</div>
		</Modal>
	);
};

export default CustomModal;
