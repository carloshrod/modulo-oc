import FormHeader from '@/components/forms/FormHeader';
import FormOc from '@/components/forms/FormOc';
import styles from './EditOC.module.css';

const EditOC = props => {
	const { params } = props;

	return (
		<section className={styles.editOc}>
			<FormHeader ocNumber={params.oc_number} />
			<FormOc ocNumber={params.oc_number.replace('editar-', '')} />
		</section>
	);
};

export default EditOC;
