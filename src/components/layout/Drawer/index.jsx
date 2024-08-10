'use client';
import OcPDF from '@/components/purchase-orders/OcPDF';
import useGlobalContext from '@/hooks/useGlobalContext';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';

const CustomDrawer = () => {
	const [showExtra, setShowExtra] = useState(true);
	const { drawer, showDrawer, hideDrawer } = useGlobalContext();
	const { drawerOpen, title, children } = drawer;

	const handleClose = () => {
		hideDrawer();
		setTimeout(() => {
			setShowExtra(true);
		}, 1000);
	};

	return (
		<Drawer
			title={title}
			onClose={handleClose}
			open={drawerOpen}
			style={{ backgroundColor: !showExtra && '#E1E1E2' }}
			width={500}
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
								showDrawer({ ...drawer, children: <OcPDF /> });
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
