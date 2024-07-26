'use client';
import { Badge, Table } from 'antd';
import { SearchFilter } from '../SearchFilter';
import { Actions } from '../Actions';
import { data } from '@/utils/consts';

const Datatable = ({ showDrawer }) => {
	const getColumnSearchProps = dataIndex =>
		SearchFilter({
			dataIndex,
		});

	const parseDate = dateStr => {
		const [day, month, year] = dateStr.split('/');
		return new Date(`20${year}`, month - 1, day);
	};

	const columns = [
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
			render: (_, record) => (
				<Actions record={record} showDrawer={showDrawer} />
			),
			width: 140,
		},
	];

	return <Table columns={columns} dataSource={data} />;
};

export default Datatable;
