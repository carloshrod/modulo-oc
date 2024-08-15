import FormOc from '@/components/forms/FormOc';
import TitleForm from '@/components/ui/TitleForm';
import styles from './EditOC.module.css';
import GoBack from '@/components/ui/GoBack';

const EditOCPage = props => {
	const { params } = props;
	const title = params.oc_number?.replace('oc-', 'OC ');
	const ocNumber = params.oc_number.replace('editar-', '');

	return (
		<div className={styles.editOc}>
			<GoBack />
			<section className={styles.editOcForm}>
				<TitleForm title={title} />
				<FormOc ocNumber={ocNumber} />
			</section>
		</div>
	);
};

export default EditOCPage;
