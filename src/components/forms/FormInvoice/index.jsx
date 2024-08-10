import useForm from '@/hooks/useForm';
import useGlobalContext from '@/hooks/useGlobalContext';
import { Button, Form, Input } from 'antd';

const FormInvoice = () => {
	const { form, addInvoice } = useForm();
	const { hideModalForm } = useGlobalContext();

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{
				modifier: 'public',
			}}
			clearOnDestroy
			onFinish={addInvoice}
		>
			<Form.Item
				name='invoice_number'
				label='N° de factura'
				rules={[
					{
						required: true,
						message: 'Ingrese número',
					},
				]}
				style={{ marginTop: 24, marginBottom: 40 }}
			>
				<Input />
			</Form.Item>
			<Form.Item
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: 10,
				}}
			>
				<Button
					type='primary'
					size='large'
					ghost
					onClick={hideModalForm}
					style={{ width: 130, marginRight: 12 }}
				>
					Cancelar
				</Button>
				<Button
					type='primary'
					size='large'
					style={{ width: 130 }}
					htmlType='submit'
				>
					Agregar
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormInvoice;
