import { useRef, useState } from 'react';

const useTable = () => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = clearFilters => {
		clearFilters();
		setSearchText('');
	};

	return {
		searchText,
		setSearchText,
		searchedColumn,
		setSearchedColumn,
		searchInput,
		handleSearch,
		handleReset,
	};
};

export default useTable;
