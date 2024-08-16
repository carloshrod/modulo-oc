'use client';
import { Button } from 'antd';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import useOcContext from '@/hooks/useOcContext';
import styles from './Toolbar.module.css';

const Toolbar = ({ onClick = undefined, children }) => {
	const { getPurchaseOrderToReceive } = useOcContext();
	const router = useRouter();

	const handleBack = () => {
		if (onClick) {
			onClick();
		} else {
			router.back();
			setTimeout(() => {
				getPurchaseOrderToReceive(undefined);
			}, 500);
		}
	};

	return (
		<div className={styles.toolbar}>
			{children}
			<Button
				type='primary'
				ghost
				icon={<BiArrowBack size={20} />}
				iconPosition='start'
				size='large'
				onClick={handleBack}
			>
				Volver
			</Button>
		</div>
	);
};

export default Toolbar;
