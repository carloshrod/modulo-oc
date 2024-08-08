const { SearchFilter } = require('./ui/SearchFilter');

export const getColumnSearchProps = dataIndex =>
	SearchFilter({
		dataIndex,
	});

export const parseDate = dateStr => {
	const [day, month, year] = dateStr.split('/');
	return new Date(`20${year}`, month - 1, day);
};
