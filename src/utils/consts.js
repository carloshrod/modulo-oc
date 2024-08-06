import { DatePicker, Input, InputNumber, Select } from 'antd';

export const data = [
	{
		key: '1',
		oc_number: 'OC 331-1',
		oc_name: 'Tornillos',
		provider_rut: '77.930.430-1',
		provider_name: 'Empresa maquinaria',
		creation_date: '12/05/23',
		approval_date: '12/05/23',
		total: 280000,
		oc_status: 'En revisión',
	},
	{
		key: '2',
		oc_number: 'OC 331-1',
		oc_name: 'Ladrillos',
		provider_rut: '88.239.035-1',
		provider_name: 'Empresa construcción',
		creation_date: '12/08/23',
		approval_date: '20/05/23',
		total: 970000,
		oc_status: 'Aprobada',
	},
	{
		key: '3',
		oc_number: 'OC 331-1',
		oc_name: 'Madera',
		provider_rut: '88.239.035-1',
		provider_name: 'Empresa construcción',
		creation_date: '24/10/23',
		approval_date: '12/05/23',
		total: 1140000,
		oc_status: 'Rechazada',
	},
	{
		key: '4',
		oc_number: 'OC 331-1',
		oc_name: 'Pintura',
		provider_rut: '56.934.123-8',
		provider_name: 'Empresa pinturas',
		creation_date: '08/03/23',
		approval_date: '12/05/23',
		total: 490000,
		oc_status: 'Borrador',
	},
	{
		key: '5',
		oc_number: 'OC 331-1',
		oc_name: 'Cerámica',
		provider_rut: '88.239.035-1',
		provider_name: 'Empresa construcción',
		creation_date: '15/03/24',
		approval_date: '12/05/23',
		total: 2450000,
		oc_status: 'En revisión',
	},
];

export const INPUT_TYPES = {
	text: ({ placeholder = 'Ingrese texto' }) => (
		<Input placeholder={placeholder} />
	),
	number: ({ placeholder, ...props }) => (
		<InputNumber
			style={{ width: '100%' }}
			placeholder={placeholder}
			{...props}
		/>
	),
	select: ({ placeholder = 'Seleccione', children, ...props }) => (
		<Select
			style={{ width: '100%' }}
			placeholder={placeholder}
			allowClear
			showSearch
			{...props}
		>
			{children}
		</Select>
	),
	date: ({ placeholder = 'Seleccione una fecha' }) => (
		<DatePicker style={{ width: '100%' }} placeholder={placeholder} />
	),
};

export const GEN_INFO_INPUTS = [
	{
		name: 'oc_name',
		label: 'Nombre OC',
		message: 'El nombre OC es requerido',
		type: 'text',
		required: true,
	},
	{
		name: 'oc_gloss',
		label: 'Glosa OC',
		message: '',
		type: 'text',
		required: false,
	},
	{
		name: 'provider',
		label: 'Proveedor',
		message: 'El proveedor es requerido',
		type: 'select',
		required: true,
		options: [
			{
				value: 'provider_1',
				label: 'Provider 1',
			},
			{
				value: 'provider_2',
				label: 'Provider 2',
			},
			{
				value: 'provider_3',
				label: 'Provider 3',
			},
		],
		searchPlaceholder: 'Busca por nombre o RUT',
	},
	{
		name: 'delivery_date',
		label: 'Fecha de entrega',
		message: 'La fecha de entrega es requerida',
		type: 'date',
		required: true,
	},
	{
		name: 'delivery_address',
		label: 'Dirección de entrega',
		message: 'La dirección de entrega es requerida',
		type: 'text',
		required: true,
	},
	{
		name: 'currency_type',
		label: 'Tipo de moneda',
		message: 'El tipo de moneda es requerido',
		type: 'select',
		required: true,
		options: [
			{
				value: 'pesos',
				label: 'Pesos',
			},
			{
				value: 'uf',
				label: 'UF',
			},
			{
				value: 'usd',
				label: 'USD',
			},
			{
				value: 'euro',
				label: 'Euro',
			},
		],
		searchPlaceholder: 'Busca',
	},
	{
		name: 'attachments',
		label: 'Anexos',
		type: 'file',
		required: true,
	},
];

export const ITEMS_INPUTS = [
	{
		name: 'item',
		label: 'Artículo',
		type: 'text',
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
		name: 'amount',
		label: 'Cantidad',
		type: 'number',
		placeholder: 'Valor',
	},
	{
		name: 'unit_price',
		label: 'Precio unitario',
		type: 'number',
		placeholder: 'Valor $',
	},
	{
		name: 'subtotal',
		label: 'Subtotal',
		type: 'number',
		placeholder: 'Valor $',
	},
];

export const CALCULATION_INPUTS = [
	{
		name: 'net_total',
		label: 'Total Neto',
	},
	{
		name: 'iva',
		label: 'IVA',
	},
	{
		name: 'total',
		label: 'Total',
	},
];
