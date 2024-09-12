import { DatePicker, Input, InputNumber, Select } from 'antd';
import {
	generateAccountCostsOptions,
	generateItemOptions,
	generateSupplierOptions,
} from '@/utils/utils';
import { useEffect, useState } from 'react';
import usePurchaseOrderContext from './usePurchaseOrderContext';
import { fetchData } from '@/services/utils';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';

const { GET_ALL_GENERAL_ITEMS } = PO_TYPES;

const useInputs = () => {
	const [suppliers, setSuppliers] = useState([]);
	const [accountCosts, setAccountCosts] = useState([]);
	const { generalItems, dispatch } = usePurchaseOrderContext();

	const fetchSuppliers = async () => {
		const data = await fetchData('/suppliers');
		if (data) setSuppliers(data);
	};

	const fetchGeneralItems = async () => {
		const data = await fetchData('/general-items');
		if (data) {
			dispatch({ type: GET_ALL_GENERAL_ITEMS, payload: data });
		}
	};

	const fetchAccountCosts = async () => {
		const data = await fetchData('/account-costs');
		if (data) setAccountCosts(data);
	};

	useEffect(() => {
		fetchSuppliers();
		fetchGeneralItems();
		fetchAccountCosts();
	}, []);

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
		select: ({ placeholder, ...props }) => {
			return (
				<Select
					style={{ width: '100%' }}
					placeholder={placeholder ?? 'Seleccione...'}
					allowClear
					showSearch
					filterOption={(input, option) => {
						try {
							const checkOption = opt => {
								const label = opt?.label?.toLowerCase();
								const value = opt?.value?.toString().toLowerCase();
								const key = opt?.key?.toLowerCase();
								return (
									label?.includes(input.toLowerCase()) ||
									value?.includes(input.toLowerCase()) ||
									key?.includes(input.toLowerCase())
								);
							};

							if (option.options) {
								return option.options.every(opt => checkOption(opt));
							} else {
								return checkOption(option);
							}
						} catch (error) {
							console.error(error);
						}
					}}
					{...props}
				/>
			);
		},
		date: ({ placeholder }) => (
			<DatePicker
				style={{ width: '100%' }}
				placeholder={placeholder ?? 'Seleccione una fecha...'}
			/>
		),
	};

	const GEN_INFO_INPUTS = [
		{
			name: 'name',
			label: 'Nombre OC',
			message: 'El nombre OC es requerido',
			type: 'text',
			required: true,
		},
		{
			name: 'gloss',
			label: 'Glosa OC',
			message: '',
			type: 'text',
			required: false,
		},
		{
			name: 'supplier_id',
			label: 'Proveedor',
			message: 'El proveedor es requerido',
			type: 'select',
			required: true,
			options: generateSupplierOptions(suppliers),
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
					value: 'Pesos',
					label: 'Pesos',
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
		},
		{
			name: 'attachments',
			label: 'Anexos',
			type: 'file',
			required: true,
		},
	];

	const ITEMS_INPUTS = [
		{
			name: 'general_item_id',
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
			name: 'account_costs_id',
			label: 'Cuenta costo',
			type: 'select',
			placeholder: 'Seleccionar cuenta costo',
			options: generateAccountCostsOptions(accountCosts),
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

	const RECEIPT_GEN_INFO_INPUTS = [
		{
			name: 'name',
			label: 'Nombre OC',
			type: 'text',
			readOnly: true,
		},
		{
			name: 'supplier_rut',
			label: 'RUT Proveedor',
			type: 'text',
			readOnly: true,
		},
		{
			name: 'supplier_name',
			label: 'Proveedor',
			type: 'text',
			readOnly: true,
		},
		{
			name: 'gloss',
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

	const RECEIPT_ITEMS_INPUTS = [
		{
			name: 'item_name',
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
			type: 'number',
			readOnly: true,
			formatter: value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			parser: value => value.replace(/\$\s?|(,*)/g, ''),
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

	const CALCULATION_INPUTS = [
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

	return {
		INPUT_TYPES,
		GEN_INFO_INPUTS,
		ITEMS_INPUTS,
		RECEIPT_GEN_INFO_INPUTS,
		RECEIPT_ITEMS_INPUTS,
		CALCULATION_INPUTS,
	};
};

export default useInputs;
