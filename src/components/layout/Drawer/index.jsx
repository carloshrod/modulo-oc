'use client';
import PoPDF from '@/components/purchase-orders/PoPDF';
import { UI_TYPES } from '@/context/ui/uiActions';
import useUiContext from '@/hooks/useUiContext';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';

const { SHOW_DRAWER, HIDE_DRAWER } = UI_TYPES;

const CustomDrawer = () => {
	const [showExtra, setShowExtra] = useState(true);
	const { drawer, dispatch } = useUiContext();
	const { isOpen, title, children } = drawer;

	const handleClose = () => {
		dispatch({ type: HIDE_DRAWER });
		setTimeout(() => {
			setShowExtra(true);
		}, 1000);
	};

	return (
		<Drawer
			title={title}
			onClose={handleClose}
			open={isOpen}
			style={{ backgroundColor: !showExtra && '#E1E1E2' }}
			width={600}
			extra={
				showExtra ? (
					<Space>
						<Button
							type='primary'
							ghost
							icon={<IoDownloadOutline size={20} />}
							iconPosition='end'
							onClick={() => {
								setShowExtra(false);
								dispatch({
									type: SHOW_DRAWER,
									payload: { ...drawer, children: <PoPDF /> },
								});
							}}
						>
							Descargar PDF
						</Button>
					</Space>
				) : null
			}
		>
			{children}
		</Drawer>
	);
};

export default CustomDrawer;
