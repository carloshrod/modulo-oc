const { env } = require('@/config/env');
const { default: axios } = require('axios');

export const getOneOeuvre = async oeuvreName => {
	try {
		const res = await axios.get(`${env.API_URL}/oeuvres/${oeuvreName}`);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
