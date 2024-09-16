'use client';
import { useEffect } from 'react';
import { Button, Divider, Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import GeneralInfoInputs from '../GeneralInfoInputs';
import ItemInputs from '../ItemInputs';
import useForm from '@/hooks/useForm';
import useUiContext from '@/hooks/useUiContext';
import useInputs from '@/hooks/useInputs';
import styles from './FormPurchaseOrder.module.css';

const FormPurchaseOrder = ({
	oeuvreId = undefined,
	purchaseOrder = undefined,
}) => {
	const { showModalConfirm } = useUiContext();
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
		if (purchaseOrder) {
			const preparedFields = {
				...purchaseOrder,
				delivery_date:
					purchaseOrder?.delivery_date && moment(purchaseOrder?.delivery_date),
				items: purchaseOrder?.items?.length > 0 ? purchaseOrder.items : [{}],
			};
			form.setFieldsValue(preparedFields);
		}
	}, [purchaseOrder]);

	return (
		<div className={styles.formWrapper}>
			<Form
				form={form}
				onFinish={() => sendForApproval(oeuvreId)}
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
							onClick={() => saveAsDraft(oeuvreId)}
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

export default FormPurchaseOrder;
