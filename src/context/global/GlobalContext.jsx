'use client';
import { createContext, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import {
	IoCheckmarkCircleOutline,
	IoNotificationsOutline,
} from 'react-icons/io5';

export const GlobalContext = createContext(undefined);

const initialDrawer = {
	drawerOpen: false,
	title: undefined,
	children: null,
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

const initialModalForm = {
	modalFormOpen: false,
	children: null,
};

const GlobalProvider = ({ children }) => {
	const [drawer, setDrawer] = useState(initialDrawer);
	const [modal, setModal] = useState(initialModal);
	const [onConfirm, setOnConfirm] = useState(null);
	const [modalForm, setModalForm] = useState(initialModalForm);

	const showDrawer = ({ title, children }) => {
		setDrawer({
			drawerOpen: true,
			title,
			children,
		});
	};

	const hideDrawer = () => setDrawer(initialDrawer);

	const showModalConfirm = (
		onConfirmCallback,
		{ danger = false, title, subtitle, okText },
	) => {
		setOnConfirm(() => onConfirmCallback);
		setModal({
			...modal,
			modalOpen: true,
			danger,
			title,
			subtitle,
			okText,
			icon: {
				bgColor: danger ? '#FFEBEB' : '#0D6EFD',
				component: danger ? (
					<HiOutlineTrash size={38} color='#E53535' />
				) : (
					<IoNotificationsOutline size={38} color='#FFEBEB' />
				),
			},
		});
	};

	const showModalNotification = successText => {
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

	const hideModal = () => setModal(initialModal);

	const confirmModal = () => {
		if (onConfirm) {
			onConfirm();
		}
	};

	const showModalForm = children => {
		setModalForm({
			modalFormOpen: true,
			children,
		});
	};

	const hideModalForm = () => setModalForm(initialModalForm);

	const data = {
		drawer,
		showDrawer,
		hideDrawer,
		modal,
		showModalConfirm,
		showModalNotification,
		hideModal,
		confirmModal,
		modalForm,
		showModalForm,
		hideModalForm,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export default GlobalProvider;
