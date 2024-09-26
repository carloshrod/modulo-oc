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
import { getPurchaseOrderByNumber } from '@/services/purchaseOrderServices';

const FormPurchaseOrder = ({ oeuvreId = undefined, poNumber = undefined }) => {
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

	const setPurchaseOrderToEdit = async () => {
		const purchaseOrderToEdit = await getPurchaseOrderByNumber({
			oeuvreId,
			poNumber,
			includeEvents: false,
		});
		if (purchaseOrderToEdit) {
			const preparedFields = {
				...purchaseOrderToEdit,
				delivery_date:
					purchaseOrderToEdit?.delivery_date &&
					moment(purchaseOrderToEdit?.delivery_date),
				items:
					purchaseOrderToEdit?.items?.length > 0
						? purchaseOrderToEdit.items
						: [{}],
			};
			form.setFieldsValue(preparedFields);
		}
	};

	useEffect(() => {
		if (poNumber) {
			setPurchaseOrderToEdit();
		}
	}, [poNumber]);

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
