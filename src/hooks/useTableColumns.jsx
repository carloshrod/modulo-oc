import { Actions } from '@/components/ui/Actions';
import { getColumnSearchProps, parseDate } from '@/components/utils';
import { Badge, Button, Space, Tooltip } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbPencilMinus } from 'react-icons/tb';
import { GiReceiveMoney } from 'react-icons/gi';
import useGlobalContext from './useGlobalContext';
import FormInvoice from '@/components/forms/FormInvoice';
import useOcContext from './useOcContext';
import { useRouter, usePathname } from 'next/navigation';

const useTableColumns = () => {
	const { showModalConfirm, showModalNotification, showModalForm } =
		useGlobalContext();
	const { getPurchaseOrder, getPurchaseOrderToReceive } = useOcContext();
	const router = useRouter();
	const pathname = usePathname();

	const handleReceiveOc = ocNumber => {
		router.push(`${pathname}/recibir-oc`);
		getPurchaseOrderToReceive(ocNumber);
	};

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
			render: value => (
				<span>
					${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</span>
			),
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
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'PU',
			dataIndex: 'unit_price',
			key: 'unit_price',
			width: 70,
			render: (_, record) => (
				<p>
					${record.unit_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
					${record.subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				</p>
			),
		},
	];

	const receiptsColumns = [
		{
			title: 'N° OC',
			dataIndex: 'oc_number',
			key: 'oc_number',
			...getColumnSearchProps('oc_number'),
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
			title: 'MONTO OC',
			dataIndex: 'oc_amount',
			key: 'oc_amount',
			sorter: (a, b) => a.oc_amount - b.oc_amount,
			sortDirections: ['descend', 'ascend'],
			render: value => (
				<span>
					${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</span>
			),
			width: 135,
		},
		{
			title: 'MONTO RECEPCIONADO',
			dataIndex: 'received_amount',
			key: 'received_amount',
			sorter: (a, b) => a.received_amount - b.received_amount,
			sortDirections: ['descend', 'ascend'],
			render: value => (
				<span>
					${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</span>
			),
			width: 135,
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record) => (
				<Space>
					<Tooltip title='Ver recepción'>
						<Button
							type='text'
							icon={<IoDocumentTextOutline size={20} color='#0D6EFD' />}
							onClick={() => getPurchaseOrder(record.oc_number)}
						/>
					</Tooltip>
					<Tooltip title='Recibir OC'>
						<Button
							type='text'
							icon={<GiReceiveMoney size={20} color='#0D6EFD' />}
							onClick={() => handleReceiveOc(record.oc_number)}
						/>
					</Tooltip>
				</Space>
			),
			width: 100,
		},
	];

	const itemsReceiptsOcColumns = [
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
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 140,
			render: (_, record) => (
				<p>
					$
					{record.received_amount
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</p>
			),
			align: 'center',
		},
		{
			title: 'MONTO POR RECIBIR',
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 140,
			render: (_, record) => (
				<p>
					$
					{record.amount_to_receive
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ' --'}
				</p>
			),
			align: 'center',
		},
		{
			title: 'ESTADO RECEPCIÓN',
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 140,
			render: (_, record) => <p>{record?.receipt_status}</p>,
			align: 'center',
		},
	];

	const receiptsHistoryColumns = [
		{
			title: 'FECHA DE RECEPCIÓN',
			dataIndex: 'reception_date',
			key: 'reception_date',
			...getColumnSearchProps('reception_date'),
			width: 70,
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
			dataIndex: 'item',
			key: 'item',
			...getColumnSearchProps('sku'),
			render: (_, record) => (
				<p>
					{record.sku} {record.oc_name}
				</p>
			),
			width: 120,
		},
		{
			title: 'CANTIDAD RECIBIDA',
			dataIndex: 'received_quantity',
			key: 'received_quantity',
			...getColumnSearchProps('received_quantity'),
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
			title: 'ESTADO RECEPCIÓN',
			dataIndex: 'receipt_status',
			key: 'receipt_status',
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
			onFilter: (value, record) => record.receipt_status.indexOf(value) === 0,
			width: 120,
		},
		{
			title: 'N° DE FACTURA',
			dataIndex: 'invoice_number',
			key: 'invoice_number',
			...getColumnSearchProps('invoice_number'),
			width: 70,
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record) => (
				<Space size='small'>
					<Tooltip title='Ingresar factura'>
						<Button
							type='text'
							icon={<TbPencilMinus size={20} color='#0D6EFD' />}
							onClick={() =>
								showModalForm({
									title: 'Ingresar N° Factura',
									children: <FormInvoice />,
								})
							}
						/>
					</Tooltip>
					<Tooltip title='Anular recepción'>
						<Button
							type='text'
							icon={<AiOutlineDelete size={20} color='#E53535' />}
							onClick={() =>
								showModalConfirm(
									() =>
										showModalNotification({
											notificationText: 'Recepción anulada exitosamente',
										}),
									{
										danger: true,
										title: '¿Deseas anular esta Recepción?',
										subtitle:
											'Si anulas, esta recepción dejará de ser editable.',
										okText: 'Anular',
									},
								)
							}
						/>
					</Tooltip>
				</Space>
			),
			width: 70,
		},
	];

	return {
		ocColumns,
		infoOcColumns,
		receiptsColumns,
		itemsReceiptsOcColumns,
		receiptsHistoryColumns,
	};
};

export default useTableColumns;
