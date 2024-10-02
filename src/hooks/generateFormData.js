export const generateFormData = purchaseOrder => {
	try {
		const formData = new FormData();

		for (const key in purchaseOrder) {
			if (key !== 'items' && key !== 'filesToKeep') {
				formData.append(key, purchaseOrder[key]);
			}
		}

		formData.append('filesToKeep', JSON.stringify(purchaseOrder?.filesToKeep));
		formData.append('items', JSON.stringify(purchaseOrder?.items));

		const { attachments } = purchaseOrder;
		if (attachments && attachments.length > 0) {
			attachments.forEach(file => {
				formData.append('files', file.originFileObj);
			});
		}

		return formData;
	} catch (error) {
		console.error(error);
	}
};
