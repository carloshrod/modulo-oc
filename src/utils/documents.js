import moment from 'moment';
import ExcelJS from 'exceljs';

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
