import { Badge } from 'antd';
import moment from 'moment';
import { ActionsPo } from '@/components/ui/ActionsPo';
import { getColumnSearchProps, parseDate } from '@/components/utils';
import ActionsReceipts from '@/components/ui/ActionsReceipts';
import ActionsHistoryReceipts from '@/components/ui/ActionsHistoryReceipts';

const useTableColumns = () => {
	const poColumns = [
		{
			title: 'N° OC',
			dataIndex: 'number',
			key: 'oc_number',
			...getColumnSearchProps('number'),
			width: 80,
		},
		{
			title: 'NOMBRE OC',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
			width: 120,
			render: value => <span>{value ?? '--'}</span>,
		},
		{
			title: 'RUT PROVEEDOR',
			dataIndex: 'supplier_rut',
			key: 'supplier_rut',
			...getColumnSearchProps('supplier_rut'),
			width: 145,
			render: value => <span>{value ?? '--'}</span>,
		},
		{
			title: 'NOMBRE PROVEEDOR',
			dataIndex: 'supplier_name',
			key: 'supplier_name',
			...getColumnSearchProps('supplier_name'),
			width: 175,
			render: value => <span>{value ?? '--'}</span>,
		},
		{
			title: 'FECHA CREACIÓN',
			dataIndex: 'created_at',
			key: 'created_at',
			sorter: (a, b) => parseDate(a.created_at) - parseDate(b.created_at),
			sortDirections: ['descend', 'ascend'],
			width: 150,
			render: value => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
		},
		{
			title: 'FECHA APROBACIÓN',
			dataIndex: 'approval_date',
			key: 'approval_date',
			sorter: (a, b) => parseDate(a.approval_date) - parseDate(b.approval_date),
			sortDirections: ['descend', 'ascend'],
			width: 165,
			render: value => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
		},
		{
			title: 'MONTO TOTAL',
			dataIndex: 'total',
			key: 'total',
			sorter: (a, b) => a.total - b.total,
			sortDirections: ['descend', 'ascend'],
			render: value => (
				<span>
					${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</span>
			),
			width: 135,
		},
		{
			title: 'ESTADO OC',
			dataIndex: 'status',
			key: 'status',
			filters: [
				{
					text: 'En revisión',
					value: 'En revisión',
				},
				{
					text: 'Aprobada',
					value: 'Aprobada',
				},
				{
					text: 'Rechazada',
					value: 'Rechazada',
				},
				{
					text: 'Borrador',
					value: 'Borrador',
				},
				{
					text: 'Cancelada',
					value: 'Cancelada',
				},
				{
					text: 'Cerrada',
					value: 'Cerrada',
				},
			],
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			render: value => {
				const COLORS = {
					'En revisión': '#0D6EFD',
					Aprobada: '#05A660',
					Rechazada: '#E53535',
					Borrador: '#FFC107',
					Cerrada: '#A0AEC0',
					Cancelada: 'volcano',
				};

				return (
					<Badge
						color={COLORS[value]}
						text={value}
						style={{ color: value === 'Cerrada' ? '#899197' : '' }}
					/>
				);
			},
			width: 120,
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record) => <ActionsPo record={record} />,
			width: 140,
		},
	];

	const infoPoColumns = [
		{
			title: 'DETALLE ARTÍCULO',
			dataIndex: 'item_details',
			key: 'item_details',
			render: (_, record) => (
				<div>
					<p style={{ fontSize: 14, color: '#0D6EFD' }}>
						{record.item_sku} ({record.measurement_unit?.toUpperCase()})
					</p>
					<p>{record.description}</p>
					<p>{record.account_cost_name}</p>
				</div>
			),
		},
		{
			title: 'CANTIDAD',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (_, record) => <p>{record?.quantity ?? '--'}</p>,
		},
		{
			title: 'PU',
			dataIndex: 'unit_price',
			key: 'unit_price',
			width: 70,
			render: (_, record) => (
				<p>
					$
					{record.unit_price
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}
				</p>
			),
		},
		{
			title: 'SUBTOTAL',
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 100,
			render: (_, record) => (
				<p>
					$
					{record.subtotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ??
						0}
				</p>
			),
		},
	];

	const receiptsColumns = [
		{
			title: 'N° OC',
			dataIndex: 'number',
			key: 'number',
			...getColumnSearchProps('number'),
			width: 80,
		},
		{
			title: 'NOMBRE OC',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
			width: 120,
		},
		{
			title: 'FECHA CREACIÓN',
			dataIndex: 'created_at',
			key: 'created_at',
			sorter: (a, b) => parseDate(a.created_at) - parseDate(b.created_at),
			sortDirections: ['descend', 'ascend'],
			width: 150,
			render: value => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
		},
		{
			title: 'RUT PROVEEDOR',
			dataIndex: 'supplier_rut',
			key: 'supplier_rut',
			...getColumnSearchProps('supplier_rut'),
			width: 145,
		},
		{
			title: 'NOMBRE PROVEEDOR',
			dataIndex: 'supplier_name',
			key: 'supplier_name',
			...getColumnSearchProps('supplier_name'),
			width: 175,
		},
		{
			title: 'MONTO OC',
			dataIndex: 'net_total',
			key: 'net_total',
			sorter: (a, b) => a.net_total - b.net_total,
			sortDirections: ['descend', 'ascend'],
			render: value => (
				<span>
					${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}
				</span>
			),
			width: 135,
		},
		{
			title: 'MONTO RECEPCIONADO',
			dataIndex: 'total_received_amount',
			key: 'total_received_amount',
			sorter: (a, b) => a.total_received_amount - b.total_received_amount,
			sortDirections: ['descend', 'ascend'],
			render: value => (
				<span>
					${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}
				</span>
			),
			width: 135,
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record) => <ActionsReceipts record={record} />,
			width: 100,
		},
	];

	const itemsReceiptsPoColumns = [
		{
			title: 'DETALLE ARTÍCULO',
			dataIndex: 'item_details',
			key: 'item_details',
			render: (_, record) => (
				<div>
					<p style={{ fontSize: 14, color: '#0D6EFD' }}>
						{record.item_sku} ({record.measurement_unit.toUpperCase()})
					</p>
					<p>{record.description}</p>
					<p>{record.account_cost_name}</p>
				</div>
			),
			width: 180,
		},
		{
			title: 'CANTIDAD',
			dataIndex: 'quantity',
			key: 'quantity',
			width: 70,
			align: 'center',
		},
		{
			title: 'PRECIO UNITARIO',
			dataIndex: 'unit_price',
			key: 'unit_price',
			width: 140,
			render: (_, record) => (
				<p>
					$
					{record.unit_price
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</p>
			),
			align: 'center',
		},
		{
			title: 'SUBTOTAL',
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 70,
			render: (_, record) => (
				<p>
					$
					{record.subtotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ??
						' --'}
				</p>
			),
			align: 'center',
		},
		{
			title: 'MONTO RECIBIDO',
			dataIndex: 'total_received_amount',
			key: 'total_received_amount',
			width: 140,
			render: (_, record) => (
				<p>
					$
					{record.total_received_amount
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}
				</p>
			),
			align: 'center',
		},
		{
			title: 'MONTO POR RECIBIR',
			dataIndex: 'amount_to_receive',
			key: 'amount_to_receive',
			width: 140,
			render: (_, record) => (
				<p>
					$
					{record.amount_to_receive
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}
				</p>
			),
			align: 'center',
		},
		{
			title: 'ESTADO RECEPCIÓN',
			dataIndex: 'receipt_status',
			key: 'receipt_status',
			width: 140,
			render: (_, record) => <p>{record?.receipt_status ?? '--'}</p>,
			align: 'center',
		},
	];

	const receiptsHistoryColumns = [
		{
			title: 'FECHA DE RECEPCIÓN',
			dataIndex: 'receipt_date',
			key: 'receipt_date',
			...getColumnSearchProps('receipt_date'),
			width: 70,
			render: value => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
		},
		{
			title: 'TIPO DE DOCUMENTO',
			dataIndex: 'doc_type',
			key: 'doc_type',
			...getColumnSearchProps('doc_type'),
			width: 100,
		},
		{
			title: 'N° DE DOCUMENTO',
			dataIndex: 'doc_number',
			key: 'doc_number',
			...getColumnSearchProps('doc_number'),
			width: 70,
		},
		{
			title: 'ARTÍCULO',
			dataIndex: 'item_sku',
			key: 'item_sku',
			...getColumnSearchProps('item_sku'),
			render: (_, record) => (
				<p>
					{record.item_sku} {record.item_name}
				</p>
			),
			width: 120,
		},
		{
			title: 'CANTIDAD RECIBIDA',
			dataIndex: 'received_quantity',
			key: 'received_quantity',
			sorter: (a, b) => a.received_quantity - b.received_quantity,
			sortDirections: ['descend', 'ascend'],
			width: 70,
		},
		{
			title: 'MONTO RECIBIDO',
			dataIndex: 'received_amount',
			key: 'received_amount',
			sorter: (a, b) => a.received_amount - b.received_amount,
			sortDirections: ['descend', 'ascend'],
			render: value => (
				<span>
					${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</span>
			),
			width: 70,
		},
		{
			title: 'ESTADO FACTURACIÓN',
			dataIndex: 'status',
			key: 'status',
			filters: [
				{
					text: 'Recepción sin factura',
					value: 'Recepción sin factura',
				},
				{
					text: 'Recepción con factura',
					value: 'Recepción con factura',
				},
				{
					text: 'Anulada',
					value: 'Anulada',
				},
			],
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			width: 120,
		},
		{
			title: 'N° DE FACTURA',
			dataIndex: 'invoice_number',
			key: 'invoice_number',
			...getColumnSearchProps('invoice_number'),
			width: 70,
			render: value => <span>{value ?? '--'}</span>,
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record) => <ActionsHistoryReceipts record={record} />,
			width: 70,
		},
	];

	return {
		poColumns,
		infoPoColumns,
		receiptsColumns,
		itemsReceiptsPoColumns,
		receiptsHistoryColumns,
	};
};

export default useTableColumns;
