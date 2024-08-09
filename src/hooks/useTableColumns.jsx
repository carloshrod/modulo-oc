import { Actions } from '@/components/ui/Actions';
import { getColumnSearchProps, parseDate } from '@/components/utils';
import { Badge, Button, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';

const useTableColumns = () => {
	const ocColumns = [
		{
			title: 'N° OC',
			dataIndex: 'oc_number',
			key: 'oc_number',
			width: 80,
		},
		{
			title: 'NOMBRE OC',
			dataIndex: 'oc_name',
			key: 'oc_name',
			...getColumnSearchProps('oc_name'),
			width: 120,
		},
		{
			title: 'RUT PROVEEDOR',
			dataIndex: 'provider_rut',
			key: 'provider_rut',
			...getColumnSearchProps('provider_rut'),
			width: 145,
		},
		{
			title: 'NOMBRE PROVEEDOR',
			dataIndex: 'provider_name',
			key: 'provider_name',
			...getColumnSearchProps('provider_name'),
			width: 175,
		},
		{
			title: 'FECHA CREACIÓN',
			dataIndex: 'creation_date',
			key: 'creation_date',
			sorter: (a, b) => parseDate(a.creation_date) - parseDate(b.creation_date),
			sortDirections: ['descend', 'ascend'],
			width: 150,
		},
		{
			title: 'FECHA APROBACIÓN',
			dataIndex: 'approval_date',
			key: 'approval_date',
			sorter: (a, b) => parseDate(a.approval_date) - parseDate(b.approval_date),
			sortDirections: ['descend', 'ascend'],
			width: 165,
		},
		{
			title: 'MONTO TOTAL',
			dataIndex: 'total',
			key: 'total',
			sorter: (a, b) => a.total - b.total,
			sortDirections: ['descend', 'ascend'],
			render: value => <span>${value}</span>,
			width: 135,
		},
		{
			title: 'ESTADO OC',
			dataIndex: 'oc_status',
			key: 'oc_status',
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
			],
			onFilter: (value, record) => record.oc_status.indexOf(value) === 0,
			render: value => {
				const COLORS = {
					'En revisión': 'processing',
					Aprobada: 'success',
					Rechazada: 'error',
					Borrador: 'warning',
				};

				return <Badge status={COLORS[value]} text={value} />;
			},
			width: 120,
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record) => <Actions record={record} />,
			width: 140,
		},
	];

	const infoOcColumns = [
		{
			title: 'DETALLE ARTÍCULO',
			dataIndex: 'sku',
			key: 'sku',
			render: (_, record) => (
				<div>
					<p style={{ fontSize: 14, color: '#0D6EFD' }}>
						{record.sku} ({record.measurement_unit})
					</p>
					<p>{record.description}</p>
					<p>{record.gloss}</p>
					<p>{record.cost_account}</p>
				</div>
			),
		},
		{
			title: 'CANTIDAD',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'PU',
			dataIndex: 'unit_price',
			key: 'unit_price',
			width: 70,
			render: (_, record) => <p>${record.unit_price}</p>,
		},
		{
			title: 'SUBTOTAL',
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 100,
			render: (_, record) => <p>${record.subtotal}</p>,
		},
	];

	const receiptsColumns = [
		{
			title: 'N° OC',
			dataIndex: 'oc_number',
			key: 'oc_number',
			width: 80,
		},
		{
			title: 'NOMBRE OC',
			dataIndex: 'oc_name',
			key: 'oc_name',
			...getColumnSearchProps('oc_name'),
			width: 120,
		},
		{
			title: 'FECHA CREACIÓN',
			dataIndex: 'creation_date',
			key: 'creation_date',
			sorter: (a, b) => parseDate(a.creation_date) - parseDate(b.creation_date),
			sortDirections: ['descend', 'ascend'],
			width: 150,
		},
		{
			title: 'RUT PROVEEDOR',
			dataIndex: 'provider_rut',
			key: 'provider_rut',
			...getColumnSearchProps('provider_rut'),
			width: 145,
		},
		{
			title: 'NOMBRE PROVEEDOR',
			dataIndex: 'provider_name',
			key: 'provider_name',
			...getColumnSearchProps('provider_name'),
			width: 175,
		},
		{
			title: 'CÓDIGO',
			dataIndex: 'code',
			key: 'code',
			...getColumnSearchProps('code'),
			width: 120,
		},
		{
			title: 'DESCRIPCIÓN',
			dataIndex: 'description',
			key: 'description',
			width: 175,
		},
		{
			title: 'MONTO OC',
			dataIndex: 'oc_amount',
			key: 'oc_amount',
			sorter: (a, b) => a.oc_amount - b.oc_amount,
			sortDirections: ['descend', 'ascend'],
			render: value => <span>${value}</span>,
			width: 135,
		},
		{
			title: 'MONTO RECEPCIONADO',
			dataIndex: 'received_amount',
			key: 'received_amount',
			sorter: (a, b) => a.received_amount - b.received_amount,
			sortDirections: ['descend', 'ascend'],
			render: value => <span>${value}</span>,
			width: 135,
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record) => (
				<Tooltip title='Ver recepción'>
					<Button
						type='text'
						icon={<IoDocumentTextOutline size={20} color='#0D6EFD' />}
						onClick={() => console.log(record.oc_number)}
					/>
				</Tooltip>
			),
			width: 100,
		},
	];

	return {
		ocColumns,
		infoOcColumns,
		receiptsColumns,
	};
};

export default useTableColumns;
