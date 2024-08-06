import { Button, Divider, Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import GeneralInfoInputs from '../GeneralInfoInputs';
import ItemInputs from '../ItemInputs';
import useForm from '@/hooks/useForm';
import styles from './FormOc.module.css';

const FormOc = () => {
	const obra = 'xxx-calle-santa-julia';
	const {
		form,
		itemError,
		onFinish,
		onFinishFailed,
		handleSubmit,
		saveAsDraft,
		onCancel,
	} = useForm(obra);

	return (
		<div className={styles.formWrapper}>
			<Form
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				layout='vertical'
				autoComplete='off'
				initialValues={{
					items: [{}],
				}}
			>
				<Divider orientation='left'>Información General</Divider>
				<GeneralInfoInputs />
				<Divider orientation='left'>Artículos</Divider>
				<ItemInputs form={form} itemError={itemError} />
				<Form.Item>
					<section className={styles.buttonsContainer}>
						<Button
							type='primary'
							style={{ width: 130 }}
							ghost
							htmlType='reset'
							onClick={onCancel}
						>
							Cancelar
						</Button>
						<Button type='primary' onClick={saveAsDraft} style={{ width: 200 }}>
							Guardar como borrador
						</Button>
						<Button
							type='primary'
							style={{ width: 200 }}
							icon={<CheckOutlined />}
							iconPosition='end'
							onClick={handleSubmit}
						>
							Enviar a aprobación
						</Button>
					</section>
				</Form.Item>
			</Form>
		</div>
	);
};

export default FormOc;
