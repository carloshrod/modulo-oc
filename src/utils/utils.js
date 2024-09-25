import Link from 'next/link';
import ExcelJS from 'exceljs';
import moment from 'moment';

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
	try {
		return (
			purchaseOrders?.length > 0 &&
			purchaseOrders?.map(po => {
				return {
					value: po.number,
					label: po.number,
				};
			})
		);
	} catch (error) {
		console.error(error);
	}
};

export const generateItemOptions = generalItems => {
	try {
		return (
			generalItems?.length > 0 &&
			generalItems.map(gi => {
				return {
					key: gi.sku,
					value: gi.id,
					label: gi.name,
				};
			})
		);
	} catch (error) {
		console.error(error);
	}
};

export const generateSupplierOptions = suppliers => {
	try {
		return (
			suppliers?.length > 0 &&
			suppliers.map(sup => {
				return {
					key: sup.supplier_rut,
					value: sup.id,
					label: sup.supplier_name,
				};
			})
		);
	} catch (error) {
		console.error(error);
	}
};

export const generateAccountCostsOptions = accountCosts => {
	try {
		const options = [];
		for (let i = 0; i < accountCosts?.length; i++) {
			options.push({
				label: <span>{accountCosts[i].family_name}</span>,
				title: accountCosts[i].family_name,
				options: accountCosts[i].accounts.map(account => {
					return {
						label: account.name,
						value: account.id,
					};
				}),
			});
		}
		return options;
	} catch (error) {
		console.error(error);
	}
};

export const validatePoItems = items => {
	try {
		const validItems =
			items?.length > 0 &&
			items.filter(item => item?.general_item_id !== undefined);
		return validItems;
	} catch (error) {
		console.error(error);
	}
};

export const generatePoExcelData = purchaseOrders => {
	try {
		const poExcelData =
			purchaseOrders?.length > 0 &&
			purchaseOrders?.map(po => {
				return {
					'N° OC': po.number,
					'Nombre OC': po.name,
					'Rut Proveedor': po.supplier_rut ?? '--',
					'Nombre Proveedor': po.supplier_name ?? '--',
					'Fecha de Creación': po?.created_at
						? moment(po.created_at).format('YYYY/MM/DD')
						: '--',
					'Fecha de Aprobación': po?.approval_date
						? moment(po.approval_date).format('YYYY/MM/DD')
						: '--',
					'Monto Total': `$ ${new Intl.NumberFormat('es-ES').format(po.total) ?? '--'}`,
					'Estado OC': po.status,
				};
			});

		return poExcelData;
	} catch (error) {
		console.error(error);
	}
};

export const downloadExcel = async data => {
	try {
		if (data?.length > 0) {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('Hoja 1');

			const headers = Object.keys(data[0]);
			worksheet.addRow(headers);
			headers.forEach((header, index) => {
				const cell = worksheet.getCell(1, index + 1);
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: '0D6EFD' },
				};
				cell.font = { bold: true };
				cell.alignment = { vertical: 'middle', horizontal: 'center' };
			});

			data.forEach(item => {
				const row = worksheet.addRow(Object.values(item));
				row.eachCell(cell => {
					cell.alignment = { vertical: 'middle', horizontal: 'center' }; // Centrando el contenido en cada celda
				});
			});

			worksheet.columns = headers.map(() => ({ width: 20 }));

			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});

			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `OCS-${moment(new Date()).format('YYYYMMDDHHmmss')}.xlsx`;
			link.click();
		}
	} catch (error) {
		console.error(error);
	}
};
