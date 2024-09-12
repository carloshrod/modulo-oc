import { env } from '@/config/env';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import axios from 'axios';

const options = {
	headers: { 'Content-Type': 'application/json' },
};

const useGeneralItemsServices = () => {
	const { generalItems, setGeneralItems } = usePurchaseOrderContext();

	const createGeneralItem = async generalItem => {
		const res = await axios.post(
			`${env.API_URL}/general-items`,
			generalItem,
			options,
		);
		const newGeneralItem = res.data;
		setGeneralItems([...generalItems, newGeneralItem]);
	};

	return { createGeneralItem };
};

export default useGeneralItemsServices;
