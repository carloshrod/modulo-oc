'use client';
import { Button } from 'antd';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import styles from './Toolbar.module.css';

const Toolbar = ({ onClick = () => null, back = true, children }) => {
	const router = useRouter();

	const handleBack = () => {
		if (back) router.back();
		onClick();
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
				Volver {!back ? 'a tabla' : null}
			</Button>
		</div>
	);
};

export default Toolbar;
