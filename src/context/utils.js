import { env } from '@/config/env';
import axios from 'axios';

export const fetchData = async endpoint => {
	try {
		const res = await axios.get(env.API_URL + endpoint);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};
