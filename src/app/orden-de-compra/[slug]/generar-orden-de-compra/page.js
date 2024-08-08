import FormOc from '@/components/forms/FormOc';
import FormHeader from '@/components/forms/FormHeader';
import styles from './GenerateOC.module.css';

const GenerateOC = () => {
	return (
		<section className={styles.generateOc}>
			<FormHeader />
			<FormOc />
		</section>
	);
};

export default GenerateOC;
