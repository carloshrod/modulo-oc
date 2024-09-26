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
