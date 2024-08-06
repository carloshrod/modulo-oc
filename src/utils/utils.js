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

function formatTitle(part) {
	return part
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
