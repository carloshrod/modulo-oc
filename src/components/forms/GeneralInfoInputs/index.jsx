import { Button, Form, InputNumber, Tooltip, Upload } from 'antd';
import { BsPlusSquare } from 'react-icons/bs';
import { UploadOutlined } from '@ant-design/icons';
import styles from './GeneralInfoInputs.module.css';
import useInputs from '@/hooks/useInputs';

const GeneralInfoInputs = ({ inputs, form }) => {
	const currencyType = Form.useWatch('currency_type');
	const { INPUT_TYPES } = useInputs();

	const normFile = e => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const handleCurrencyChange = value => {
		if (value === 'Pesos') {
			form.setFieldsValue({ exchange_rate: 1 }, form);
		}
	};

	const EXTRAS = {
		provider: (
			<Tooltip title='Agregar proveedor'>
				<Button
					style={{
						position: 'absolute',
						top: -38,
						left: 80,
					}}
					type='text'
					icon={<BsPlusSquare size={22} color='#0D6EFD' />}
					onClick={() => console.log('Agregando proveedor!')}
				/>
			</Tooltip>
		),
	};

	return (
		<section className={styles.generalInfoInputs}>
			{inputs?.map((input, index) =>
				input.type !== 'file' ? (
					<div
						key={`${index}-${input.name}`}
						style={{
							display: input.name === 'currency_type' ? 'flex' : '',
							gap: 16,
						}}
					>
						<Form.Item
							name={input.name}
							label={input.label}
							rules={[
								{
									required: input.required,
									message: input.message,
								},
							]}
							extra={EXTRAS[input.name] ?? null}
							style={{ width: input.name === 'currency_type' ? '50%' : '' }}
						>
							{INPUT_TYPES[input.type]({
								placeholder: input?.placeholder,
								readOnly: input?.readOnly,
								options: input?.options,
								onChange:
									input.name === 'currency_type'
										? handleCurrencyChange
										: undefined,
							})}
						</Form.Item>
						{input.name === 'currency_type' ? (
							<Form.Item
								name='exchange_rate'
								label='Tasa de cambio'
								rules={[
									{
										required: currencyType !== 'Pesos',
										message: 'La tasa de cambio es requerida',
									},
								]}
								style={{
									width: '50%',
								}}
							>
								<InputNumber
									style={{
										width: '100%',
									}}
									controls={false}
									placeholder='Valor $'
									disabled={currencyType === 'Pesos'}
									formatter={value =>
										value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={value => value.replace(/\$\s?|(,*)/g, '')}
								/>
							</Form.Item>
						) : null}
					</div>
				) : (
					<Form.Item
						key={`${index}-${input.name}`}
						name={input.name}
						label={input.label}
						valuePropName='fileList'
						getValueFromEvent={normFile}
						extra='Sólo en formatos PDF, JPG, PNG, XLXS'
					>
						<Upload
							name='logo'
							listType='picture'
							multiple
							maxCount={5}
							accept='.pdf,.jpg,.jpeg,.png,.xlsx'
						>
							<Button
								icon={<UploadOutlined />}
								style={{ whiteSpace: 'normal', height: '38px' }}
							>
								Adjuntar documentos (máx 5)
							</Button>
						</Upload>
					</Form.Item>
				),
			)}
		</section>
	);
};

export default GeneralInfoInputs;
