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
	title: null,
	subtitle: null,
	okText: undefined,
	icon: { bgColor: undefined, component: null },
	confirmed: false,
	successText: undefined,
};

const GlobalProvider = ({ children }) => {
	const [drawer, setDrawer] = useState(initialDrawer);
	const [modal, setModal] = useState(initialModal);
	const [onConfirm, setOnConfirm] = useState(null);

	const showDrawer = title => {
		setDrawer({
			drawerOpen: true,
			title,
		});
	};

	const hideDrawer = () => {
		setDrawer(initialDrawer);
	};

	const showModalConfirm = (
		onConfirmCallback,
		{ danger = false, title, subtitle, okText, icon },
	) => {
		setModal({
			...modal,
			modalOpen: true,
			danger,
			title,
			subtitle,
			okText,
			icon,
		});
		setOnConfirm(() => onConfirmCallback);
	};

	const showModalNotification = ({ successText }) => {
		setModal({
			...modal,
			modalOpen: true,
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

	const confirmModal = () => {
		if (onConfirm) {
			onConfirm();
		}
	};

	const data = {
		drawer,
		showDrawer,
		hideDrawer,
		modal,
		showModalConfirm,
		showModalNotification,
		hideModal,
		confirmModal,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export default GlobalProvider;
