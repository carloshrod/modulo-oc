import FormOc from '@/components/forms/FormOc';
import TitleForm from '@/components/ui/TitleForm';
import styles from './EditOC.module.css';

const EditOCPage = props => {
	const { params } = props;
	const title = params.oc_number?.replace('oc-', 'OC ');
	const ocNumber = params.oc_number.replace('editar-', '');

	return (
		<section className={styles.editOc}>
			<TitleForm title={title} />
			<FormOc ocNumber={ocNumber} />
		</section>
	);
};

export default EditOCPage;
