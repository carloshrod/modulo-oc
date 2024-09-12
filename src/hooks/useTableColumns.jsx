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
import moment from 'moment';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrdersServices';
import { PO_TYPES } from '@/context/OC/purchaseOrdersActions';

const { GET_ONE_PURCHASE_ORDER, GET_PURCHASE_ORDER_TO_RECEIVE } = PO_TYPES;

const useTableColumns = () => {
	const { showModalConfirm, showModalNotification, showModalForm } =
		useGlobalContext();
	const { dispatch } = useOcContext();
	const router = useRouter();
	const pathname = usePathname();

	const handleDisplayReceipt = async poNumber => {
		const data = await getPurchaseOrderByNumber({ poNumber });
		dispatch({
			type: GET_ONE_PURCHASE_ORDER,
			payload: data,
		});
	};

	const handleReceiveOc = async poNumber => {
		const data = await getPurchaseOrderByNumber({ poNumber });
		dispatch({
			type: GET_PURCHASE_ORDER_TO_RECEIVE,
			payload: data,
		});
		router.push(`${pathname}/recibir-oc`);
	};

	const ocColumns = [
		{
			title: 'N° OC',
			dataIndex: 'number',
			key: 'oc_number',
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
			],
			onFilter: (value, record) => record.status.indexOf(value) === 0,
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
		},
		{
			title: 'PU',
			dataIndex: 'unit_price',
			key: 'unit_price',
			width: 70,
			render: (_, record) => (
				<p>
					${record.unit_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
					${record.subtotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
			dataIndex: 'total',
			key: 'total',
			sorter: (a, b) => a.total - b.total,
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
			dataIndex: 'received_amount',
			key: 'received_amount',
			sorter: (a, b) => a.received_amount - b.received_amount,
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
			render: (_, record) => (
				<Space>
					<Tooltip title='Ver recepción'>
						<Button
							type='text'
							icon={<IoDocumentTextOutline size={20} color='#0D6EFD' />}
							onClick={() => handleDisplayReceipt(record.number)}
						/>
					</Tooltip>
					<Tooltip title='Recibir OC'>
						<Button
							type='text'
							icon={<GiReceiveMoney size={20} color='#0D6EFD' />}
							onClick={() => handleReceiveOc(record.number)}
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
			dataIndex: 'received_amount',
			key: 'received_amount',
			width: 140,
			render: (_, record) => (
				<p>
					$
					{record.received_amount
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}
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
					{record.subtotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ??
						0}
				</p>
			),
			align: 'center',
		},
		{
			title: 'ESTADO RECEPCIÓN',
			dataIndex: 'subtotal',
			key: 'subtotal',
			width: 140,
			render: (_, record) => <p>{record?.receipt_status ?? 'Sin recepción'}</p>,
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
