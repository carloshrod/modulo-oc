import { DatePicker, Input, InputNumber, Select } from 'antd';

export const ocData = [
	{
		key: '1',
		oc_number: 'OC-331-5',
		oc_name: 'Palos',
		oc_gloss: 'Palos para subnivel',
		provider_rut: '77.930.430-1',
		provider_name: 'Sodimac Homecenter S.A',
		provider: 'Sodimac Homecenter S.A',
		delivery_date: '2024-08-20T05:00:00.000Z',
		delivery_address: 'Las rosas 50, Vitacura, Región Metropolitana',
		currency_type: 'Peso',
		items: [
			{
				sku: 'PAN3CA1UN',
				item: 'Palos',
				description: 'Palos N 3',
				gloss: 'Palos N 3',
				cost_account: 'cost_account_1',
				measurement_unit: 'un',
				amount: 20,
				subtotal: 119800,
				unit_price: 5990,
			},
			{
				sku: 'PAN4CA1UN',
				item: 'Palos',
				description: 'Palos N 4',
				gloss: 'Palos N 4',
				cost_account: 'cost_account_1',
				measurement_unit: 'un',
				amount: 2,
				subtotal: 11980,
				unit_price: 5990,
			},
		],
		net_total: 131780,
		iva: 25038.2,
		total: 156818.2,
		creation_date: '06/08/24',
		approval_date: '--',
		oc_status: 'Borrador',
	},
	{
		key: '2',
		oc_number: 'OC-332-3',
		oc_name: 'Varillas',
		oc_gloss: 'Varillas para subnivel',
		provider_rut: '77.930.430-1',
		provider_name: 'Sodimac Homecenter S.A',
		provider: 'Sodimac Homecenter S.A',
		delivery_date: '2024-08-20T05:00:00.000Z',
		delivery_address: 'Las rosas 50, Vitacura, Región Metropolitana',
		currency_type: 'Peso',
		items: [
			{
				sku: 'VAN1CA1UN',
				item: 'Varillas',
				description: 'Varillas N 1',
				gloss: 'Varillas N 1',
				cost_account: 'cost_account_1',
				measurement_unit: 'un',
				amount: 40,
				subtotal: 1839600,
				unit_price: 45990,
			},
		],
		net_total: 1839600,
		iva: 349524,
		total: 2189124,
		creation_date: '15/05/24',
		approval_date: '20/05/24',
		oc_status: 'Aprobada',
	},
	{
		key: '3',
		oc_number: 'OC-335-7',
		oc_name: 'Pintura',
		oc_gloss: 'Pintura',
		provider_rut: '55.358.387-1',
		provider_name: 'Proveedor Pintura',
		provider: 'Proveedor Pintura',
		delivery_date: '2024-08-20T05:00:00.000Z',
		delivery_address: 'Las rosas 50, Vitacura, Región Metropolitana',
		currency_type: 'Peso',
		items: [
			{
				sku: 'PIN1CA2UN',
				item: 'Pintura',
				description: 'Pintura N 1',
				gloss: 'Pintura N 1',
				cost_account: 'cost_account_2',
				measurement_unit: 'un',
				amount: 12,
				subtotal: 840000,
				unit_price: 70000,
			},
		],
		net_total: 840000,
		iva: 159600,
		total: 999600,
		creation_date: '12/02/24',
		approval_date: '--',
		oc_status: 'Rechazada',
	},
	{
		key: '4',
		oc_number: 'OC-340-0',
		oc_name: 'Tornillos',
		oc_gloss: 'Tornillos',
		provider_rut: '55.358.387-1',
		provider_name: 'Proveedor Tornillos',
		provider: 'Proveedor Tornillos',
		delivery_date: '2024-08-20T05:00:00.000Z',
		delivery_address: 'Las rosas 50, Vitacura, Región Metropolitana',
		currency_type: 'Peso',
		items: [
			{
				sku: 'TON1CA1UN',
				item: 'Tornillos',
				description: 'Tornillos N 1',
				gloss: 'Tornillos N 1',
				cost_account: 'cost_account_1',
				measurement_unit: 'un',
				amount: 120,
				subtotal: 180000,
				unit_price: 1500,
			},
			{
				sku: 'TON2CA1UN',
				item: 'Tornillos',
				description: 'Tornillos N 2',
				gloss: 'Tornillos N 2',
				cost_account: 'cost_account_1',
				measurement_unit: 'un',
				amount: 80,
				subtotal: 96000,
				unit_price: 5990,
			},
		],
		net_total: 276000,
		iva: 52440,
		total: 328440,
		creation_date: '09/02/24',
		approval_date: '--',
		oc_status: 'En revisión',
	},
];

export const receiptsData = [
	{
		key: '1',
		oc_number: 'OC-331-5',
		oc_name: 'Palos',
		oc_gloss: 'Palos para subnivel',
		provider_rut: '77.930.430-1',
		provider_name: 'Sodimac Homecenter S.A',
		provider: 'Sodimac Homecenter S.A',
		code: '3315',
		description: 'Palos para subnivel',
		currency_type: 'Peso',
		oc_amount: 276000,
		received_amount: 276000,
		creation_date: '06/08/24',
	},
	{
		key: '2',
		oc_number: 'OC-332-3',
		oc_name: 'Varillas',
		oc_gloss: 'Varillas para subnivel',
		provider_rut: '77.930.430-1',
		provider_name: 'Sodimac Homecenter S.A',
		provider: 'Sodimac Homecenter S.A',
		code: '3323',
		description: 'Varillas para subnivel',
		currency_type: 'Peso',
		oc_amount: 760000,
		received_amount: 760000,
		creation_date: '15/05/24',
	},
	{
		key: '3',
		oc_number: 'OC-335-7',
		oc_name: 'Pintura',
		oc_gloss: 'Pintura',
		provider_rut: '55.358.387-1',
		provider_name: 'Proveedor Pintura',
		provider: 'Proveedor Pintura',
		code: '3357',
		description: 'Descripción para pintura',
		currency_type: 'Peso',
		oc_amount: 1240000,
		received_amount: 1240000,
		creation_date: '12/02/24',
	},
	{
		key: '4',
		oc_number: 'OC-335-7',
		oc_name: 'Tornillos',
		oc_gloss: 'Tornillos',
		provider_rut: '55.358.387-1',
		provider_name: 'Proveedor Tornillos',
		provider: 'Proveedor Tornillos',
		code: '3357',
		description: 'Descripción para tornillos',
		currency_type: 'Peso',
		oc_amount: 163500,
		received_amount: 163500,
		creation_date: '09/02/24',
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
				value: 'Sodimac Homecenter S.A',
				label: 'Sodimac Homecenter S.A',
			},
			{
				value: 'Proveedor Pintura',
				label: 'Proveedor Pintura',
			},
			{
				value: 'Proveedor Tornillos',
				label: 'Proveedor Tornillos',
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
				value: 'Peso',
				label: 'Peso',
			},
			{
				value: 'UF',
				label: 'UF',
			},
			{
				value: 'usdUSD',
				label: 'USD',
			},
			{
				value: 'Euro',
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

export const OCS = [];
