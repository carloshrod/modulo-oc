import FormOc from '@/components/forms/FormOc';
import FormHeader from '@/components/forms/FormHeader';
import styles from './GenerateOC.module.css';

const GenerateOC = () => {
	return (
		<main className={styles.main}>
			<FormHeader />
			<FormOc />
		</main>
	);
};

export default GenerateOC;
