'use client';
import { useState } from 'react';
import styles from './PurchaseOrder.module.css';
import { Button, Drawer, Layout } from 'antd';
import CustomHeader from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import Datatable from '@/components/Datatable';
import { IoDownloadOutline } from 'react-icons/io5';

const { Content } = Layout;

const PurchaseOrder = () => {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(false);

	const showDrawer = ocName => {
		setTitle(ocName);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<Layout>
			<CustomHeader />
			<Content style={{ padding: '8px 16px' }}>
				<Toolbar />
				<div className={styles.tableContainer}>
					<Datatable showDrawer={showDrawer} />
				</div>
			</Content>
			<Drawer
				title={title}
				onClose={onClose}
				open={open}
				style={{ backgroundColor: '#E1E1E2' }}
			>
				<div className={styles.pdfContainer}>
					<p style={{ fontSize: 30, fontWeight: 'bold' }}>PDF</p>
				</div>
				<div style={{ textAlign: 'end' }}>
					<Button
						style={{ backgroundColor: '#fff', fontWeight: 600 }}
						type='primary'
						ghost
						icon={<IoDownloadOutline size={20} />}
						iconPosition='end'
					>
						Descargar PDF
					</Button>
				</div>
			</Drawer>
		</Layout>
	);
};

export default PurchaseOrder;
