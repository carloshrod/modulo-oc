import Link from 'next/link';

const { SearchFilter } = require('./ui/SearchFilter');

export const getColumnSearchProps = dataIndex =>
	SearchFilter({
		dataIndex,
	});

export const parseDate = dateStr => {
	const [day, month, year] = dateStr.split('/');
	return new Date(`20${year}`, month - 1, day);
};

export const generateBreadcrumbs = pathname => {
	const parts = pathname.split('/').filter(Boolean);
	const linkBasePath = '/';

	return parts.map((part, index) => {
		const isLast = index === parts.length - 1;
		const linkPath = linkBasePath + parts.slice(0, index + 1).join('/');

		if (isLast) {
			return { title: formatTitle(part) };
		} else {
			return {
				title: <Link href={linkPath}>{formatTitle(part)}</Link>,
			};
		}
	});
};

export const formatTitle = part => {
	if (!part) return;
	if (part.includes('oc-')) {
		return part.replace('oc-', 'Editar OC ');
	}

	if (part.includes('recibir-oc')) {
		return part.replace('recibir-oc', 'Recibir OC');
	}

	return part
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const checkIsEditable = (purchaseOrder, loggedUser) => {
	const canCreatorEdit =
		purchaseOrder?.user_create === loggedUser?.id &&
		purchaseOrder.status === 'Borrador';

	const canApproverEdit =
		purchaseOrder?.current_approver?.user_id === loggedUser?.id &&
		purchaseOrder.status === 'En revisión';

	const userResponsible = purchaseOrder?.current_approver
		? purchaseOrder?.current_approver?.user_id
		: purchaseOrder?.user_create;

	const poRejectedIsEditable =
		purchaseOrder.status === 'Rechazada' && userResponsible === loggedUser?.id;

	return canCreatorEdit || canApproverEdit || poRejectedIsEditable;
};

export const checkIsDeletable = (purchaseOrder, loggedUser) => {
	const canDelete =
		loggedUser?.role === 'USUARIO-OBRA' ||
		loggedUser?.role === 'USUARIO-BODEGUERO';

	return (
		(purchaseOrder.status === 'Borrador' ||
			purchaseOrder.status === 'Aprobada') &&
		canDelete
	);
};
