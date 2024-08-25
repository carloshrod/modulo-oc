import { DatePicker, Input, InputNumber, Select } from 'antd';
import { generateItemOptions } from '@/utils/utils';
import useOcContext from './useOcContext';

const useInputs = () => {
	const { generalItems } = useOcContext();

	const INPUT_TYPES = {
		text: ({ placeholder, readOnly, ...props }) => (
			<Input
				style={{ backgroundColor: readOnly ? '#F5F5F5' : '' }}
				placeholder={placeholder ?? 'Ingrese texto'}
				readOnly={readOnly}
				{...props}
			/>
		),
		number: ({ readOnly, ...props }) => (
			<InputNumber
				style={{ width: '100%', backgroundColor: readOnly ? '#F5F5F5' : '' }}
				placeholder={props?.placeholder ?? 'Ingrese valor'}
				controls={false}
				readOnly={readOnly}
				{...props}
			/>
		),
		select: ({ placeholder, children, ...props }) => {
			return (
				<Select
					style={{ width: '100%' }}
					placeholder={placeholder ?? 'Seleccione...'}
					allowClear
					showSearch
					optionFilterProp='children'
					filterOption={(input, option) => {
						const label = option?.children?.toLowerCase();
						const value = option?.value?.toString().toLowerCase();
						const key = option?.key?.toLowerCase();
						return (
							label.includes(input.toLowerCase()) ||
							value.includes(input.toLowerCase()) ||
							key.includes(input.toLowerCase())
						);
					}}
					{...props}
				>
					{children}
				</Select>
			);
		},
		date: ({ placeholder }) => (
			<DatePicker
				style={{ width: '100%' }}
				placeholder={placeholder ?? 'Seleccione una fecha...'}
			/>
		),
	};

	const ITEMS_INPUTS = [
		{
			name: 'item',
			label: 'Artículo',
			type: 'select',
			options: generateItemOptions(generalItems),
		},
		{
			name: 'description',
			label: 'Descripción',
			type: 'text',
		},
		{
			name: 'cost_account',
			label: 'Cuenta costo',
			type: 'select',
			placeholder: 'Seleccionar cuenta costo',
			options: [
				{
					value: 'cost_account_1',
					label: 'Cuenta costo 1',
				},
				{
					value: 'cost_account_2',
					label: 'Cuenta costo 2',
				},
				{
					value: 'cost_account_3',
					label: 'Cuenta costo 3',
				},
			],
		},
		{
			name: 'measurement_unit',
			label: 'Unidad de medida',
			type: 'text',
		},
		{
			name: 'quantity',
			label: 'Cantidad',
			type: 'number',
			placeholder: 'Valor',
		},
		{
			name: 'unit_price',
			label: 'Precio unitario',
			type: 'number',
			placeholder: 'Valor $',
			formatter: value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			parser: value => value.replace(/\$\s?|(,*)/g, ''),
		},
		{
			name: 'subtotal',
			label: 'Subtotal',
			type: 'number',
			formatter: value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			parser: value => value.replace(/\$\s?|(,*)/g, ''),
		},
	];

	return { INPUT_TYPES, ITEMS_INPUTS };
};

export default useInputs;
