import TitleFormOC from '@/components/forms/TitleFormOC';
import FormOc from '@/components/forms/FormOc';
import styles from './EditOC.module.css';

const EditOCPage = props => {
	const { params } = props;

	return (
		<section className={styles.editOc}>
			<TitleFormOC ocNumber={params.oc_number} />
			<FormOc ocNumber={params.oc_number.replace('editar-', '')} />
		</section>
	);
};

export default EditOCPage;
