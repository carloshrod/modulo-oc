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
