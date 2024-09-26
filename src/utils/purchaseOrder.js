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
