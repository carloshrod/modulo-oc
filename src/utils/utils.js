import Link from 'next/link';

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

export const generateOcOptions = purchaseOrders => {
	return purchaseOrders.map(oc => {
		return {
			value: oc.oc_number,
			label: oc.oc_number,
		};
	});
};

export const generateItemOptions = generalItems => {
	try {
		return generalItems.map(gi => {
			return {
				value: gi.sku,
				label: gi.name,
			};
		});
	} catch (error) {
		console.error(error);
	}
};
