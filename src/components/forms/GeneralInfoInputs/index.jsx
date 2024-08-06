import { Button, Form, Select, Tooltip, Upload } from 'antd';
import { BsPlusSquare } from 'react-icons/bs';
import { UploadOutlined } from '@ant-design/icons';
import styles from './GeneralInfoInputs.module.css';
import { GEN_INFO_INPUTS, INPUT_TYPES } from '@/utils/consts';

const GeneralInfoInputs = () => {
	const normFile = e => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	return (
		<section className={styles.generalInfoInputs}>
			{GEN_INFO_INPUTS.map((input, index) =>
				input.type !== 'file' ? (
					<Form.Item
						key={`${index}-${input.name}`}
						name={input.name}
						label={input.label}
						rules={[
							{
								required: input.required,
								message: input.message,
							},
						]}
						extra={
							input.name === 'provider' ? (
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
							) : null
						}
					>
						{INPUT_TYPES[input.type]({
							placeholder: input?.placeholder,
							children:
								input.type === 'select'
									? input?.options?.map(option => (
											<Select.Option key={option.value} value={option.value}>
												{option.label}
											</Select.Option>
										))
									: null,
						})}
					</Form.Item>
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
								style={{ whiteSpace: 'normal', height: 'auto' }}
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
