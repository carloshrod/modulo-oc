import { Button, Form, Input } from 'antd';
import useForm from '@/hooks/useForm';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useUiContext from '@/hooks/useUiContext';
const { TextArea } = Input;

const FormRejectPo = ({ purchaseOrderId }) => {
	const { form, rejectPo } = useForm();
	const { hideModalForm } = useUiContext();
	const { loggedUser } = usePurchaseOrderContext();

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{
				modifier: 'public',
			}}
			clearOnDestroy
			onFinish={() => rejectPo(purchaseOrderId, loggedUser.id)}
		>
			<Form.Item
				name='comments'
				label='Agregar comentarios'
				rules={[
					{
						required: true,
						message: 'Ingrese texto',
					},
				]}
				style={{ marginTop: 24, marginBottom: 40 }}
			>
				<TextArea rows={4} />
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
					Confirmar
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormRejectPo;
