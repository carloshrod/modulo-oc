import { DatePicker, Input, InputNumber, Select } from 'antd';

export const ocDataDb = [
	{
		id: '1',
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
				quantity: 20,
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
				quantity: 2,
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
		reception_date: '06/08/24',
	},
	{
		id: '2',
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
				quantity: 40,
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
		id: '3',
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
				quantity: 12,
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
		id: '4',
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
				quantity: 120,
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
				quantity: 80,
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

export const approvalEventsDb = [
	{
		event_id: 'e3323',
		oc_id: '2',
		aprobador: 'creador',
		event_date: '15/05/24',
		event_status: 'Envío a aprobación',
	},
	{
		event_id: 'e3323',
		oc_id: '2',
		aprobador: 'aprobador5',
		event_date: '15/05/24',
		event_status: 'Aprobada',
	},
	{
		event_id: 'e3357',
		oc_id: '3',
		aprobador: 'creador',
		event_date: '12/02/24',
		event_status: 'Envío a aprobación',
	},
	{
		event_id: 'e3357',
		oc_id: '3',
		aprobador: 'aprobador5',
		event_date: '14/02/24',
		event_status: 'Rechazada',
	},
	{
		event_id: 'e3400',
		oc_id: '4',
		aprobador: 'creador',
		event_date: '12/02/24',
		event_status: 'Envío a aprobación',
	},
];

export const receiptsData = [
	{
		id: '1',
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
		received_quantity: 20,
		received_amount: 276000,
		creation_date: '06/08/24',
		reception_date: '07/08/24',
		doc_type: 'Guía despacho',
		doc_number: '123',
		sku: 'PAN3CA1UN',
		receipt_status: 'Recepción con factura',
		invoice_number: '34',
	},
	{
		id: '2',
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
		received_quantity: 40,
		received_amount: 760000,
		creation_date: '15/05/24',
		reception_date: '17/05/24',
		doc_type: 'Guía despacho',
		doc_number: '234',
		sku: 'VAN1CA1UN',
		receipt_status: 'Recepción con factura',
		invoice_number: '25',
	},
	{
		id: '3',
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
		received_quantity: 10,
		received_amount: 1240000,
		creation_date: '12/02/24',
		reception_date: '17/05/24',
		doc_type: 'Guía despacho',
		doc_number: '456',
		sku: 'PIN1CA2UN',
		receipt_status: 'Anulada',
		invoice_number: '22',
	},
	{
		id: '4',
		oc_number: 'OC-340-0',
		oc_name: 'Tornillos',
		oc_gloss: 'Tornillos',
		provider_rut: '55.358.387-1',
		provider_name: 'Proveedor Tornillos',
		provider: 'Proveedor Tornillos',
		code: '3357',
		description: 'Descripción para tornillos',
		currency_type: 'Peso',
		oc_amount: 163500,
		received_quantity: 120,
		received_amount: 163500,
		creation_date: '09/02/24',
		reception_date: '11/02/24',
		doc_type: 'Guía despacho',
		doc_number: '765',
		sku: 'TON1CA1UN',
		receipt_status: 'Recepción con factura',
		invoice_number: '18',
	},
	{
		id: '5',
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
		received_quantity: 2,
		received_amount: 183000,
		creation_date: '06/08/24',
		reception_date: '07/08/24',
		doc_type: 'Guía despacho',
		doc_number: '345',
		sku: 'PAN4CA1UN',
		receipt_status: 'Recepción sin factura',
		invoice_number: '39',
	},
];

export const INPUT_TYPES = {
	text: ({ placeholder = 'Ingrese texto', readOnly }) => (
		<Input
			placeholder={placeholder}
			readOnly={readOnly}
			style={{ backgroundColor: readOnly ? '#F5F5F5' : '' }}
		/>
	),
	number: ({ placeholder, ...props }) => (
		<InputNumber
			style={{ width: '100%' }}
			placeholder={placeholder}
			controls={false}
			{...props}
		/>
	),
	select: ({
		placeholder = 'Seleccione...',
		allowSearch,
		children,
		...props
	}) => (
		<Select
			style={{ width: '100%' }}
			placeholder={placeholder}
			allowClear
			showSearch={allowSearch}
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
				value: 'USD',
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

export const RECEIPT_GEN_INFO_INPUTS = [
	{
		name: 'oc_name',
		label: 'Nombre OC',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'provider_rut',
		label: 'RUT Proveedor',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'provider_name',
		label: 'Proveedor',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'oc_gloss',
		label: 'Glosa OC',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'reception_date',
		label: 'Fecha de recepción',
		message: 'La fecha de recepción es requerida',
		type: 'date',
		required: true,
	},
	{
		name: 'doc_type',
		label: 'Tipo de documento',
		message: 'El tipo de documento es requerido',
		type: 'select',
		options: [
			{
				value: 'Factura',
				label: 'Factura',
			},
			{
				value: 'Guía de despacho',
				label: 'Guía de despacho',
			},
			{
				value: 'Boleta de honorarios',
				label: 'Boleta de honorarios',
			},
			{
				value: 'Vale',
				label: 'Vale',
			},
			{
				value: 'Estado de pago',
				label: 'Estado de pago',
			},
		],
		required: true,
		allowSearch: false,
	},
	{
		name: 'doc_number',
		label: 'N° de documento',
		placeholder: 'Ingrese número',
		message: 'El N° de documento es requerido',
		type: 'text',
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

export const RECEIPT_ITEMS_INPUTS = [
	{
		name: 'item',
		label: 'Artículo',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'description',
		label: 'Descripción',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'measurement_unit',
		label: 'Unidad de medida',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'quantity',
		label: 'Cantidad OC',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'unit_price',
		label: 'Precio unitario',
		type: 'text',
		readOnly: true,
	},
	{
		name: 'received_quantity',
		label: 'Cantidad recibida',
		type: 'number',
		placeholder: 'Ingrese número',
	},
	{
		name: 'received_amount',
		label: 'Monto recibido',
		type: 'number',
		placeholder: 'Valor $',
		formatter: value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
		parser: value => value.replace(/\$\s?|(,*)/g, ''),
	},
];

export const CALCULATION_INPUTS = [
	{
		name: 'discount',
		label: 'Descuento',
		placeholder: 'Valor $',
	},
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
