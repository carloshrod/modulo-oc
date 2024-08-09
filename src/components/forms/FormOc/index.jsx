'use client';
import { Button, Divider, Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import GeneralInfoInputs from '../GeneralInfoInputs';
import ItemInputs from '../ItemInputs';
import useForm from '@/hooks/useForm';
import styles from './FormOc.module.css';
import { useEffect } from 'react';
import moment from 'moment';
import useOcContext from '@/hooks/useOcContext';

const FormOc = ({ ocNumber }) => {
	const obra = 'xxx-calle-santa-julia';
	const { purchaseOrders } = useOcContext();
	const {
		form,
		itemError,
		onFinish,
		onFinishFailed,
		handleSubmit,
		saveAsDraft,
		onCancel,
	} = useForm(obra);

	useEffect(() => {
		const foundedOc = purchaseOrders.find(el => {
			return el.oc_number.toLowerCase() === ocNumber;
		});

		if (foundedOc) {
			const preparedFields = {
				...foundedOc,
				delivery_date: moment(foundedOc.delivery_date),
			};
			form.setFieldsValue(preparedFields);
		}
	}, [ocNumber]);

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
