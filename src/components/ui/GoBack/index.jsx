'use client';
import { Button } from 'antd';
import { BiArrowBack } from 'react-icons/bi';
import styles from './GoBack.module.css';
import { useRouter } from 'next/navigation';

const GoBack = ({ onClick = undefined }) => {
	const router = useRouter();

	const handleBack = () => {
		if (onClick) {
			onClick();
		} else {
			router.back();
		}
	};

	return (
		<div className={styles.goBack}>
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

export default GoBack;
