'use client';
import { UI_TYPES } from '@/context/ui/uiActions';
import useUiContext from '@/hooks/useUiContext';
import { Modal } from 'antd';

const { HIDE_MODAL } = UI_TYPES;

const CustomModal = () => {
	const {
		modal: {
			isOpen,
			danger,
			title,
			subtitle,
			okText,
			confirmed,
			icon,
			notificationText,
			success,
			onConfirm,
		},
		dispatch,
	} = useUiContext();

	const confirmModal = () => {
		if (onConfirm) {
			onConfirm();
		}
	};

	return (
		<Modal
			closeIcon={false}
			centered
			open={isOpen}
			onOk={confirmModal}
			onCancel={() => dispatch({ type: HIDE_MODAL })}
			cancelButtonProps={{
				size: 'large',
				type: 'primary',
				ghost: true,
				width: 230,
			}}
			cancelText='Cancelar'
			okButtonProps={{ size: 'large', type: 'primary', danger }}
			okText={okText}
			footer={confirmed ? null : undefined}
			width={600}
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
						<h4 style={{ fontSize: 24, fontWeight: 500 }}>{title}</h4>
						<p style={{ fontSize: 16, fontWeight: 500, color: '#87898E' }}>
							{subtitle}
						</p>
					</>
				) : (
					<h4
						style={{
							fontSize: 24,
							fontWeight: 500,
							color: success ? '#05A660' : '#E53535',
						}}
					>
						{notificationText}
					</h4>
				)}
			</div>
		</Modal>
	);
};

export default CustomModal;
