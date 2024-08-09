'use client';
import useGlobalContext from '@/hooks/useGlobalContext';
import { Button, Form, Input, Modal } from 'antd';

const ModalForm = () => {
	const [form] = Form.useForm();
	const { modalForm, hideModalForm, showModalNotification } =
		useGlobalContext();

	const addInvoice = values => {
		console.log(values);
		hideModalForm();
		showModalNotification({ successText: 'Factura ingresada exitosamente' });
	};

	return (
		<Modal
			open={modalForm}
			title='Ingresar N° Factura'
			okText='Agregar'
			cancelText='Cancelar'
			okButtonProps={{
				autoFocus: true,
				htmlType: 'submit',
			}}
			onCancel={hideModalForm}
			destroyOnClose
			centered
			width={450}
			footer={null}
		>
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
		</Modal>
	);
};

export default ModalForm;
