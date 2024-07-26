'use client';
import { createContext, useState } from 'react';

export const GlobalContext = createContext(undefined);

const GlobalProvider = ({ children }) => {
	const [drawer, setDrawer] = useState({
		open: false,
		title: null,
	});

	const showDrawer = title => {
		setDrawer({
			open: true,
			title,
		});
	};

	const onClose = () => {
		setDrawer({ ...drawer, open: false });
	};

	const data = { drawer, showDrawer, onClose };

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export default GlobalProvider;
