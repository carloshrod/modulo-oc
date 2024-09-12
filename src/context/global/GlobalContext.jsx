'use client';
import { createContext, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import {
	IoNotificationsOutline,
	IoCheckmarkCircleOutline,
	IoCloseCircleOutline,
} from 'react-icons/io5';
import useOcContext from '@/hooks/useOcContext';
import { PO_TYPES } from '../OC/purchaseOrdersActions';

const { GET_ONE_PURCHASE_ORDER } = PO_TYPES;

export const GlobalContext = createContext(undefined);

const initialDrawer = {
	drawerOpen: false,
	title: undefined,
	children: null,
};

const initialModal = {
	modalOpen: false,
	danger: false,
	title: undefined,
	subtitle: undefined,
	okText: undefined,
	icon: { bgColor: undefined, component: null },
	confirmed: false,
	notificationText: undefined,
	success: true,
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
	const { dispatch } = useOcContext();
	const [loggedUser, setLoggedUser] = useState({});

	const showDrawer = ({ title, children }) => {
		setDrawer({
			drawerOpen: true,
			title,
			children,
		});
	};

	const hideDrawer = () => {
		setDrawer(initialDrawer);
		dispatch({
			type: GET_ONE_PURCHASE_ORDER,
			payload: {},
		});
	};

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

	const showModalNotification = ({ notificationText, success = true }) => {
		setModal({
			...modal,
			modalOpen: true,
			icon: {
				bgColor: success ? '#EBF8F1' : '#FFEBEB',
				component: success ? (
					<IoCheckmarkCircleOutline size={38} color='#05A660' />
				) : (
					<IoCloseCircleOutline size={38} color='#E53535' />
				),
			},
			confirmed: true,
			notificationText,
			success,
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

	const showModalForm = ({ title, children }) => {
		setModalForm({
			modalFormOpen: true,
			title,
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
		loggedUser,
		setLoggedUser,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export default GlobalProvider;
