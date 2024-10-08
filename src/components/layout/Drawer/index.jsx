'use client';
import { useEffect, useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { IoDownloadOutline } from 'react-icons/io5';
import PoPdfPreview from '@/components/purchase-orders/PoPdfPreview';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useUiContext from '@/hooks/useUiContext';

const CustomDrawer = () => {
	const [showExtra, setShowExtra] = useState(false);
	const { drawer, showDrawer, hideDrawer } = useUiContext();
	const { isOpen, title, children } = drawer;
	const { purchaseOrder } = usePurchaseOrderContext();
	const isApproved = purchaseOrder?.status === 'Aprobada';

	useEffect(() => {
		if (isOpen) {
			setShowExtra(true);
		} else {
			setShowExtra(false);
		}
	}, [isOpen]);

	return (
		<Drawer
			title={title}
			onClose={hideDrawer}
			open={isOpen}
			style={{ backgroundColor: !showExtra && isApproved && '#E1E1E2' }}
			width={600}
			extra={
				showExtra && isApproved ? (
					<Space>
						<Button
							type='primary'
							ghost
							icon={<IoDownloadOutline size={20} />}
							iconPosition='end'
							onClick={() => {
								setShowExtra(false);
								showDrawer({
									...drawer,
									children: <PoPdfPreview poNumber={purchaseOrder.number} />,
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
