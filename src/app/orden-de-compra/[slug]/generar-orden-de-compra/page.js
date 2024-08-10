import FormOc from '@/components/forms/FormOc';
import TitleFormOC from '@/components/forms/TitleFormOC';
import styles from './GenerateOC.module.css';

const GenerateOCPage = () => {
	return (
		<section className={styles.generateOc}>
			<TitleFormOC />
			<FormOc />
		</section>
	);
};

export default GenerateOCPage;
