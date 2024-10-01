'use client';
import { useEffect, useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { IoDownloadOutline } from 'react-icons/io5';
import PoPdfPreview from '@/components/purchase-orders/PoPdfPreview';
import { UI_TYPES } from '@/context/ui/uiActions';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useUiContext from '@/hooks/useUiContext';

const { SHOW_DRAWER, HIDE_DRAWER } = UI_TYPES;

const CustomDrawer = () => {
	const [showExtra, setShowExtra] = useState(false);
	const { drawer, dispatch } = useUiContext();
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
			onClose={() => dispatch({ type: HIDE_DRAWER })}
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
								dispatch({
									type: SHOW_DRAWER,
									payload: {
										...drawer,
										children: <PoPdfPreview poNumber={purchaseOrder.number} />,
									},
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
