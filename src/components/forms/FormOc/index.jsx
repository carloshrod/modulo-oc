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
import useGlobalContext from '@/hooks/useGlobalContext';
import useInputs from '@/hooks/useInputs';

const FormOc = ({ ocNumber }) => {
	const { showModalConfirm } = useGlobalContext();
	const { purchaseOrders } = useOcContext();
	const {
		form,
		itemError,
		sendForApproval,
		sendForApprovalFailed,
		saveAsDraft,
		onCancel,
	} = useForm();
	const { GEN_INFO_INPUTS, ITEMS_INPUTS } = useInputs();

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
	}, [ocNumber, purchaseOrders]);

	return (
		<div className={styles.formWrapper}>
			<Form
				form={form}
				onFinish={sendForApproval}
				onFinishFailed={sendForApprovalFailed}
				layout='vertical'
				autoComplete='off'
				initialValues={{
					items: [{}],
				}}
			>
				<Divider orientation='left'>Información General</Divider>
				<GeneralInfoInputs inputs={GEN_INFO_INPUTS} form={form} />
				<Divider orientation='left'>Artículos</Divider>
				<ItemInputs
					inputs={ITEMS_INPUTS}
					type='oc'
					form={form}
					itemError={itemError}
				/>
				<Form.Item>
					<section className={styles.buttonsContainer}>
						<Button
							type='primary'
							size='large'
							style={{ width: 130 }}
							ghost
							onClick={onCancel}
						>
							Cancelar
						</Button>
						<Button
							type='primary'
							size='large'
							onClick={saveAsDraft}
							style={{ width: 200 }}
						>
							Guardar como borrador
						</Button>
						<Button
							type='primary'
							size='large'
							style={{ width: 200 }}
							icon={<CheckOutlined />}
							iconPosition='end'
							onClick={() =>
								showModalConfirm(() => form.submit(), {
									title: '¿Deseas enviar OC a aprobación?',
									subtitle:
										'Se enviará un correo a los aprobadores responsables para revisar tu OC.',
									okText: 'Aceptar',
								})
							}
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
