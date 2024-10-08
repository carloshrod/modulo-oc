import { useEffect } from 'react';
import { Button, Form, InputNumber, Tooltip } from 'antd';
import { BsPlusSquare } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import FormItem from '../FormItem';
import useUiContext from '@/hooks/useUiContext';
import useInputs from '@/hooks/useInputs';
import styles from './ItemInputs.module.css';

const ItemInputs = ({ inputs, type = '', form, itemError = undefined }) => {
	const IVA_RATE = 0.19;
	const { showModalForm } = useUiContext();
	const { INPUT_TYPES, CALCULATION_INPUTS } = useInputs();
	const exchangeRate =
		Form.useWatch('exchange_rate') || form.getFieldValue('exchange_rate');

	useEffect(() => {
		const items = form.getFieldValue('items');
		items.forEach((_, index) => updateSubtotal(index));
	}, [exchangeRate]);

	const updateSubtotal = name => {
		const items = form.getFieldValue('items');
		const item = items[name];
		const subtotal =
			parseInt(item?.quantity ?? 0) *
			(parseFloat(item?.unit_price ?? 0) * parseFloat(exchangeRate));

		form.setFieldsValue({
			items: items.map((field, index) =>
				index === name ? { ...field, subtotal } : field,
			),
		});

		updateCalculations();
	};

	const updateCalculations = () => {
		const items = form.getFieldValue('items') || [];
		const discount = form.getFieldValue('discount') ?? 0;

		const netTotal =
			items.reduce(
				(total, item) => parseFloat(total) + parseFloat(item?.subtotal ?? 0),
				0,
			) + parseFloat(discount);

		const iva = parseFloat(netTotal * IVA_RATE);
		const total = parseFloat(netTotal + iva);

		form.setFieldsValue({
			net_total: netTotal,
			iva,
			total,
		});
	};

	const updateReceivedValues = (name, field, value) => {
		const items = form.getFieldValue('items');
		const item = items[name];
		const quantity_to_receive = item?.quantity_to_receive ?? 0;
		const subtotal = item?.subtotal ?? 0;
		const unitPrice = parseFloat(item?.unit_price ?? 0);

		let receivedQuantity = parseInt(item?.received_quantity ?? 0);
		let receivedAmount = parseFloat(item?.received_amount ?? 0);

		if (field === 'received_quantity') {
			receivedQuantity = value;
			receivedAmount =
				receivedQuantity * (unitPrice * parseFloat(exchangeRate));

			if (receivedAmount > subtotal) {
				receivedAmount = subtotal;
				receivedQuantity =
					receivedAmount / (unitPrice * parseFloat(exchangeRate));
			}

			if (receivedQuantity > quantity_to_receive) {
				receivedQuantity = quantity_to_receive;
				receivedAmount =
					receivedQuantity * (unitPrice * parseFloat(exchangeRate));
			}
		} else if (field === 'received_amount') {
			receivedAmount = value;

			if (receivedAmount > subtotal) {
				receivedAmount = subtotal;
			}

			receivedQuantity =
				receivedAmount / (unitPrice * parseFloat(exchangeRate));

			if (receivedQuantity > quantity_to_receive) {
				receivedQuantity = quantity_to_receive;
				receivedAmount =
					receivedQuantity * (unitPrice * parseFloat(exchangeRate));
			}
		}

		form.setFieldsValue({
			items: items.map((field, index) =>
				index === name
					? {
							...field,
							received_quantity: receivedQuantity,
							received_amount: receivedAmount,
						}
					: field,
			),
		});

		updateReceiptCalculations();
	};

	const updateReceiptCalculations = () => {
		const items = form.getFieldValue('items') || [];
		const discount = form.getFieldValue('discount') || 0;

		const netTotal =
			items.reduce(
				(total, item) =>
					parseFloat(total) + parseFloat(item?.received_amount ?? 0),
				0,
			) + parseFloat(discount);

		const iva = parseFloat(netTotal * IVA_RATE);
		const total = parseFloat(netTotal + iva);

		form.setFieldsValue({
			net_total: netTotal,
			iva,
			total,
		});
	};

	const handleValueChange = (name, field, value) => {
		const items = form.getFieldValue('items');
		items[name][field] = value;

		if (type === 'oc') {
			updateSubtotal(name);
		} else {
			updateReceivedValues(name, field, value);
		}
	};

	const handleAddItem = () => {
		showModalForm({
			title: 'Agregar Artículo',
			children: <FormItem />,
		});
	};

	const handleDiscountChange = (name, value) => {
		if (name === 'discount') {
			let newValue = value;
			if (value > 0) {
				newValue = -value;
			}

			form.setFieldsValue({ [name]: newValue });
			if (type === 'oc') {
				updateCalculations();
			} else {
				updateReceiptCalculations();
			}
		}
	};

	return (
		<section
			className={styles.items}
			style={{ marginRight: type !== 'oc' && 0 }}
		>
			<Form.List name='items'>
				{(fields, { add, remove }) => {
					return (
						<>
							{fields.map(({ key, name, ...restField }) => {
								return (
									<section key={key} className={styles.itemsInputs}>
										{inputs?.map((input, index) => {
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
													extra={
														input.name === 'general_item_id' &&
														name === 0 &&
														type === 'oc' ? (
															<Tooltip title='Agregar artículo'>
																<Button
																	style={{
																		position: 'absolute',
																		top: -38,
																		left: 59,
																	}}
																	type='text'
																	icon={
																		<BsPlusSquare size={22} color='#0D6EFD' />
																	}
																	onClick={handleAddItem}
																/>
															</Tooltip>
														) : null
													}
												>
													{INPUT_TYPES[input.type]({
														placeholder: input?.placeholder,
														readOnly: input?.readOnly,
														formatter: input?.formatter,
														parser: input?.parser,
														options: input?.options,
														onChange:
															input.name === 'quantity' ||
															input.name === 'unit_price' ||
															input.name === 'received_quantity' ||
															input.name === 'received_amount'
																? value =>
																		handleValueChange(name, input.name, value)
																: () => null,
													})}
												</Form.Item>
											);
										})}
										{type === 'oc' ? (
											<div
												className={styles.actions}
												style={{
													top: name === 0 && '42%',
												}}
											>
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
															color={
																fields.length === 1 ? '#FCBABA' : '#E53535'
															}
														/>
													}
													onClick={() => {
														remove(name);
														updateCalculations();
													}}
													disabled={fields.length === 1}
												/>
											</div>
										) : null}
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
						<InputNumber
							{...input}
							style={{ width: '100%' }}
							controls={false}
							onChange={value => handleDiscountChange(input.name, value)}
							formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/\$\s?|(,*)/g, '')}
						/>
					</Form.Item>
				</div>
			))}
		</section>
	);
};

export default ItemInputs;
