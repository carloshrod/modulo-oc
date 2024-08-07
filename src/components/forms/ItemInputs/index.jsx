import { Button, Form, InputNumber, Select } from 'antd';
import { BsPlusSquare } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { CALCULATION_INPUTS, INPUT_TYPES, ITEMS_INPUTS } from '@/utils/consts';
import styles from './ItemInputs.module.css';

const ItemInputs = ({ form, itemError }) => {
	const IVA_RATE = 0.19;

	const updateSubtotal = name => {
		const items = form.getFieldValue('items');
		const item = items[name];
		const subtotal = (item?.amount || 0) * (item?.unit_price || 0);
		form.setFieldsValue({
			items: items.map((field, index) =>
				index === name ? { ...field, subtotal } : field,
			),
		});

		updateCalculations();
	};

	const handleValueChange = (name, field, value) => {
		const items = form.getFieldValue('items');
		items[name][field] = value;
		updateSubtotal(name);
	};

	const updateCalculations = () => {
		const items = form.getFieldValue('items') || [];
		const netTotal = items.reduce(
			(total, item) => total + (item?.subtotal || 0),
			0,
		);
		const iva = netTotal * IVA_RATE;
		const total = netTotal + iva;

		form.setFieldsValue({
			net_total: netTotal,
			iva,
			total,
		});
	};

	return (
		<section className={styles.items}>
			<Form.List name='items'>
				{(fields, { add, remove }) => {
					return (
						<>
							{fields.map(({ key, name, ...restField }) => {
								return (
									<section key={key} className={styles.itemsInputs}>
										{ITEMS_INPUTS.map((input, index) => {
											return (
												<Form.Item
													{...restField}
													key={index}
													name={[name, input.name]}
													label={name === 0 ? input.label : null}
													rules={[
														{
															required: true,
															message: '',
														},
													]}
													className={`noRequiredMark ${input.name === 'cost_account' ? 'costAccountSelect' : ''}`}
												>
													{INPUT_TYPES[input.type]({
														placeholder: input?.placeholder,
														children:
															input.type === 'select'
																? input?.options?.map(option => (
																		<Select.Option
																			key={option.value}
																			value={option.value}
																		>
																			{option.label}
																		</Select.Option>
																	))
																: null,
														onChange:
															input.name === 'amount' ||
															input.name === 'unit_price'
																? value =>
																		handleValueChange(name, input.name, value)
																: () => null,
													})}
												</Form.Item>
											);
										})}
										<div className={styles.actions}>
											<Button
												style={{ marginTop: name === 0 ? 6 : -24 }}
												type='text'
												icon={<BsPlusSquare size={22} color='#0D6EFD' />}
												onClick={() => add()}
											/>
											<Button
												style={{ marginTop: name === 0 ? 4 : -24 }}
												type='text'
												icon={
													<AiOutlineDelete
														size={28}
														color={fields.length === 1 ? '#FCBABA' : '#E53535'}
													/>
												}
												onClick={() => {
													remove(name);
													updateCalculations();
												}}
												disabled={fields.length === 1}
											/>
										</div>
									</section>
								);
							})}
							{itemError ? (
								<Form.Item style={{ textAlign: 'end' }}>
									<Form.ErrorList
										errors={['Es necesario al menos un artículo']}
									/>
								</Form.Item>
							) : null}
						</>
					);
				}}
			</Form.List>
			{CALCULATION_INPUTS.map((input, index) => (
				<div key={`${index}-${input.name}`} className={styles.inputCalculation}>
					<Form.Item
						name={input.name}
						label={input.label}
						layout='horizontal'
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
				</div>
			))}
		</section>
	);
};

export default ItemInputs;
