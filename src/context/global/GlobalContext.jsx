'use client';
import { createContext, useState } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

export const GlobalContext = createContext(undefined);

const initialDrawer = {
	drawerOpen: false,
	title: undefined,
};

const initialModal = {
	modalOpen: false,
	danger: false,
	okText: undefined,
	children: null,
	icon: { bgColor: undefined, component: null },
	confirmed: false,
	successText: undefined,
};

const GlobalProvider = ({ children }) => {
	const [drawer, setDrawer] = useState(initialDrawer);
	const [modal, setModal] = useState(initialModal);

	const showDrawer = title => {
		setDrawer({
			drawerOpen: true,
			title,
		});
	};

	const hideDrawer = () => {
		setDrawer(initialDrawer);
	};

	const showModalConfirm = ({ danger, okText, children, icon }) => {
		setModal({
			...modal,
			modalOpen: true,
			danger,
			okText,
			children,
			icon,
		});
	};

	const showModalNotification = ({ children, successText }) => {
		setModal({
			...modal,
			modalOpen: true,
			children,
			icon: {
				bgColor: '#EBF8F1',
				component: <IoCheckmarkCircleOutline size={38} color='#05A660' />,
			},
			confirmed: true,
			successText,
		});
		setTimeout(() => {
			hideModal();
		}, 1500);
	};

	const hideModal = () => {
		setModal(initialModal);
	};

	const data = {
		drawer,
		showDrawer,
		hideDrawer,
		modal,
		showModalConfirm,
		showModalNotification,
		hideModal,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export default GlobalProvider;
