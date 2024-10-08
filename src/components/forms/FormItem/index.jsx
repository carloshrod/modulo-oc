import { Button, Form, Input } from 'antd';
import useForm from '@/hooks/useForm';
import useUiContext from '@/hooks/useUiContext';

const FormItem = () => {
	const { hideModalForm } = useUiContext();
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
				name='name'
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
