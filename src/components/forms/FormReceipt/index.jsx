import { Button, Divider, Form } from 'antd';
import styles from './FormReceipt.module.css';
import GeneralInfoInputs from '../GeneralInfoInputs';
import ItemInputs from '../ItemInputs';
import { RECEIPT_GEN_INFO_INPUTS, RECEIPT_ITEMS_INPUTS } from '@/utils/consts';
import useOcContext from '@/hooks/useOcContext';
import { useEffect } from 'react';
import useForm from '@/hooks/useForm';

const FormReceipt = () => {
	const { purchaseOrder, getPurchaseOrder } = useOcContext();
	const { form, saveReceipt } = useForm();

	useEffect(() => {
		if (purchaseOrder) {
			const preparedFields = {
				...purchaseOrder,
				reception_date: '',
				doc_type: '',
				doc_number: '',
				net_total: '',
				iva: '',
				total: '',
			};
			form.setFieldsValue(preparedFields);
		}
	}, [purchaseOrder]);

	return (
		<div className={styles.formWrapper}>
			<Form
				form={form}
				onFinish={saveReceipt}
				// onFinishFailed={sendForApprovalFailed}
				layout='vertical'
				autoComplete='off'
				initialValues={{
					items: [{}],
				}}
			>
				<Divider orientation='left'>Información General</Divider>
				<GeneralInfoInputs inputs={RECEIPT_GEN_INFO_INPUTS} />
				<Divider orientation='left'>Artículos</Divider>
				<ItemInputs inputs={RECEIPT_ITEMS_INPUTS} form={form} />
				<Form.Item>
					<section className={styles.buttonsContainer}>
						<Button
							type='primary'
							size='large'
							ghost
							onClick={() => getPurchaseOrder(undefined)}
						>
							Cancelar
						</Button>
						<Button
							type='primary'
							size='large'
							iconPosition='end'
							htmlType='submit'
						>
							Guardar
						</Button>
					</section>
				</Form.Item>
			</Form>
		</div>
	);
};

export default FormReceipt;
