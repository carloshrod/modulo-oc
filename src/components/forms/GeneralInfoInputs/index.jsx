import { Button, Form, InputNumber, Select, Tooltip, Upload } from 'antd';
import { BsPlusSquare } from 'react-icons/bs';
import { UploadOutlined } from '@ant-design/icons';
import styles from './GeneralInfoInputs.module.css';
import { INPUT_TYPES } from '@/utils/consts';
import { useState } from 'react';

const GeneralInfoInputs = ({ inputs }) => {
	const [currencyType, setCurrencyType] = useState(null);

	const normFile = e => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const handleCurrencyChange = value => {
		setCurrencyType(value);
	};

	console.log(currencyType);

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
								allowSearch: input?.allowSearch,
								readOnly: input?.readOnly ?? false,
								children:
									input.type === 'select'
										? input?.options?.map(option => (
												<Select.Option key={option.value} value={option.value}>
													{option.label}
												</Select.Option>
											))
										: null,
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
										required: currencyType !== 'Peso',
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
									disabled={currencyType === 'Peso'}
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
						<Upload name='logo' listType='picture' multiple maxCount={5}>
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
