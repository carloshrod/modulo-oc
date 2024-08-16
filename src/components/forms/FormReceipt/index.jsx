import { Button, Divider, Form } from 'antd';
import styles from './FormReceipt.module.css';
import GeneralInfoInputs from '../GeneralInfoInputs';
import ItemInputs from '../ItemInputs';
import { RECEIPT_GEN_INFO_INPUTS, RECEIPT_ITEMS_INPUTS } from '@/utils/consts';
import useOcContext from '@/hooks/useOcContext';
import { useEffect } from 'react';
import useForm from '@/hooks/useForm';
import { useRouter } from 'next/navigation';

const FormReceipt = () => {
	const { purchaseOrderToReceive, getPurchaseOrderToReceive } = useOcContext();
	const { form, saveReceipt } = useForm();
	const router = useRouter();

	const handleCancel = () => {
		router.back();
		setTimeout(() => {
			getPurchaseOrderToReceive(undefined);
		}, 500);
	};

	useEffect(() => {
		if (purchaseOrderToReceive) {
			const preparedFields = {
				...purchaseOrderToReceive,
				reception_date: '',
				doc_type: '',
				doc_number: '',
				discount: '',
				net_total: '',
				iva: '',
				total: '',
			};
			form.setFieldsValue(preparedFields);
		}
	}, [purchaseOrderToReceive]);

	return (
		<div className={styles.formWrapper}>
			<Form
				form={form}
				onFinish={saveReceipt}
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
						<Button type='primary' size='large' ghost onClick={handleCancel}>
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
