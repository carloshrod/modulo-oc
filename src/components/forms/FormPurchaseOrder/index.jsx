'use client';
import { useEffect, useState } from 'react';
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
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';

const FormPurchaseOrder = ({ oeuvre = undefined, poNumber = undefined }) => {
	const { showModalConfirm } = useUiContext();
	const {
		form,
		itemError,
		sendForApproval,
		sendForApprovalFailed,
		saveAsDraft,
		onCancel,
	} = useForm();
	const { loggedUser } = usePurchaseOrderContext();
	const { GEN_INFO_INPUTS, ITEMS_INPUTS } = useInputs(oeuvre);
	const [purchaseOrderToEdit, setpurchaseOrderToEdit] = useState({});
	const isLastApprover = loggedUser?.approver_role === 'approver4';

	const setPurchaseOrderToEdit = async () => {
		const data = await getPurchaseOrderByNumber({
			oeuvreId: oeuvre?.id,
			poNumber,
			includeEvents: false,
		});
		setpurchaseOrderToEdit(data);
		if (data) {
			const preparedFields = {
				...data,
				delivery_date: data?.delivery_date && moment(data?.delivery_date),
				items: data?.items?.length > 0 ? data.items : [{}],
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
				onFinish={() => sendForApproval(oeuvre?.id)}
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
							onClick={() => saveAsDraft(oeuvre?.id)}
							style={{ width: 200 }}
							disabled={poNumber && purchaseOrderToEdit?.status !== 'Borrador'}
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
									title: `${isLastApprover ? '¿Deseas aprobar esta OC?' : '¿Deseas enviar OC a aprobación?'}`,
									subtitle: `${isLastApprover ? 'La OC podrá comenzar a ser recepcionada.' : 'Se enviará un correo a los aprobadores responsables para revisar tu OC.'}`,
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
