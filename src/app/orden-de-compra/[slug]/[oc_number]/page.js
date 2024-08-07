import FormHeader from '@/components/forms/FormHeader';
import FormOc from '@/components/forms/FormOc';
import styles from './EditOC.module.css';

const EditOC = props => {
	const { params } = props;

	return (
		<main className={styles.main}>
			<FormHeader ocNumber={params.oc_number} />
			<FormOc ocNumber={params.oc_number.replace('editar-', '')} />
		</main>
	);
};

export default EditOC;
