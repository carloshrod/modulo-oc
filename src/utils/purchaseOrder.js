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

export const validateItemReceipts = itemReceipts => {
	try {
		return (
			itemReceipts?.length > 0 &&
			itemReceipts.some(
				item => item.received_quantity > 0 && item.received_amount > 0,
			)
		);
	} catch (error) {
		console.error(error);
	}
};
