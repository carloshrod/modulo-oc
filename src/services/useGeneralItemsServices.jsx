import { env } from '@/config/env';
import useOcContext from '@/hooks/useOcContext';
import axios from 'axios';

const options = {
	headers: { 'Content-Type': 'application/json' },
};

const useGeneralItemsServices = () => {
	const { generalItems, setGeneralItems } = useOcContext();

	const createGeneralItem = async generalItem => {
		const res = await axios.post(
			`${env.API_URL}/general-items`,
			generalItem,
			options,
		);
		const newGeneralItem = res.data;
		setGeneralItems([newGeneralItem, ...generalItems]);
	};

	return { createGeneralItem };
};

export default useGeneralItemsServices;
