import useForm from '@/hooks/useForm';
import useGlobalContext from '@/hooks/useGlobalContext';
import { Button, Form, Input } from 'antd';

const FormItem = () => {
	const { hideModalForm } = useGlobalContext();
	const { form, addItem } = useForm();

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{
				modifier: 'public',
			}}
			clearOnDestroy
			onFinish={addItem}
		>
			<Form.Item
				name='sku_item'
				label='SKU'
				rules={[
					{
						required: true,
						message: 'Ingrese sku',
					},
				]}
				style={{ marginTop: 24 }}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='sku_name'
				label='Nombre de Artículo'
				rules={[
					{
						required: true,
						message: 'Ingrese nombre de artículo',
					},
				]}
				style={{ marginBottom: 40 }}
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

export default FormItem;
