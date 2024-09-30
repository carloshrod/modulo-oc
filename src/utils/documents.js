import moment from 'moment';
import ExcelJS from 'exceljs';

export const generatePoExcelData = purchaseOrders => {
	try {
		if (purchaseOrders?.length > 0) {
			const poExcelData = [];

			purchaseOrders?.forEach(po => {
				po?.items?.forEach(item => {
					const data = {
						'N° OC': po.number,
						'NOMBRE OC': po.name,
						FECHA: po?.created_at
							? moment(po.created_at).format('YYYY/MM/DD')
							: '--',
						'RUT PROVEEDOR': po.supplier_rut ?? '--',
						PROVEEDOR: po.supplier_name ?? '--',
						SKU: item?.general_item?.sku,
						ARTÍCULO: item?.general_item?.name,
						DESCRIPCIÓN: item?.description,
						'UNIDAD DE MEDIDA': item.measurement_unit,
						MONEDA: po.currency_type,
						'ESTADO OC': po.status,
						CANTIDAD: item.quantity,
						'CANTIDAD RECEP.': item.received_quantity ?? 0,
						'CANTIDAD POR RECEP.': item.quantity_to_receive,
						'PRECIO UNITARIO': item.unit_price,
						MONTO: item.subtotal,
						'MONTO RECEP.': item.received_amount ?? 0,
						'MONTO POR RECEP.': item.amount_to_receive,
						'CUENTA DE COSTOS': item?.account_cost?.identifier,
					};

					poExcelData.push(data);
				});
			});

			return poExcelData;
		}
	} catch (error) {
		console.error(error);
	}
};

export const generatePoReceiptsExcelData = purchaseOrders => {
	try {
		if (purchaseOrders?.length > 0) {
			const poReceiptsExcelData = [];

			purchaseOrders?.forEach(po => {
				po?.itemReceipts?.forEach(itemReceipt => {
					const data = {
						'ID RECEP.': itemReceipt.id,
						'FECHA DE CREACIÓN': itemReceipt.created_at
							? moment(itemReceipt.created_at).format('YYYY/MM/DD')
							: '--',
						'FECHA RECEP.': itemReceipt.receipt_date
							? moment(itemReceipt.receipt_date).format('YYYY/MM/DD')
							: '--',
						'TIPO DOCUMENTO': itemReceipt.doc_type,
						'N° DOCUMENTO': itemReceipt.doc_number,
						'ESTADO RECEPCIÓN': itemReceipt.status,
						'N° ORDEN DE COMPRA': po.number,
						'RUT PROVEEDOR': po.supplier_rut ?? '--',
						PROVEEDOR: po.supplier_name ?? '--',
						SKU: itemReceipt?.item?.general_item?.sku,
						ARTÍCULO: itemReceipt?.item?.general_item?.name,
						DESCRIPCIÓN: itemReceipt?.item?.description,
						'UNIDAD DE MEDIDA': itemReceipt?.item?.measurement_unit,
						'CANTIDAD RECEP.': itemReceipt.received_quantity ?? 0,
						'PRECIO UNITARIO': itemReceipt?.item?.unit_price,
						'MONTO RECIBIDO': itemReceipt.received_amount ?? 0,
						'CUENTA DE COSTOS': itemReceipt?.item?.account_cost?.identifier,
						'NOMBRE CUENTA': itemReceipt?.item?.account_cost?.name,
						'NOMBRE OBRA': po.oeuvre.oeuvre_name,
					};

					poReceiptsExcelData.push(data);
				});
			});

			return poReceiptsExcelData;
		}
	} catch (error) {
		console.error(error);
	}
};

export const downloadExcel = async (data, prefix) => {
	try {
		if (data?.length > 0) {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('Hoja 1');

			const headers = Object.keys(data[0]);
			worksheet.addRow(headers);
			headers.forEach((_header, index) => {
				const cell = worksheet.getCell(1, index + 1);
				cell.font = { bold: true };
				cell.alignment = { vertical: 'middle', horizontal: 'center' };
			});

			data.forEach(item => {
				const row = worksheet.addRow(Object.values(item));
				row.eachCell(cell => {
					cell.alignment = { vertical: 'middle', horizontal: 'center' };
				});
			});

			worksheet.columns = headers.map(() => ({ width: 20 }));

			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});

			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `${prefix}-${moment(new Date()).format('YYYYMMDDHHmmss')}.xlsx`;
			link.click();
		}
	} catch (error) {
		console.error(error);
	}
};
