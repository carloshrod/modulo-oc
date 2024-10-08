'use client';
import { createContext, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import {
	IoNotificationsOutline,
	IoCheckmarkCircleOutline,
	IoCloseCircleOutline,
} from 'react-icons/io5';

export const UiContext = createContext(undefined);

const initialDrawer = {
	isOpen: false,
	title: undefined,
	children: null,
};

const initialModal = {
	isOpen: false,
	warning: false,
	title: undefined,
	subtitle: undefined,
	okText: undefined,
	icon: { bgColor: undefined, component: null },
	confirmed: false,
	notificationText: undefined,
	success: true,
	onConfirm: undefined,
};

const initialModalForm = {
	isOpen: false,
	title: undefined,
	children: null,
};

const UiProvider = ({ children }) => {
	const [drawer, setDrawer] = useState(initialDrawer);
	const [modal, setModal] = useState(initialModal);
	const [modalForm, setModalForm] = useState(initialModalForm);

	const showDrawer = data => {
		setDrawer({
			isOpen: true,
			...data,
		});
	};

	const hideDrawer = () => {
		setDrawer(initialDrawer);
	};

	const showModalConfirm = (
		onConfirmCallback,
		{ warning = false, title, subtitle, okText },
	) => {
		setModal({
			...modal,
			isOpen: true,
			warning,
			title,
			subtitle,
			okText,
			icon: {
				bgColor: warning ? '#FFEBEB' : '#0D6EFD',
				component: warning ? (
					<HiOutlineTrash size={38} color='#E53535' />
				) : (
					<IoNotificationsOutline size={38} color='#FFEBEB' />
				),
			},
			onConfirm: () => onConfirmCallback(),
		});
	};

	const showModalNotification = ({ notificationText, success = true }) => {
		setModal({
			...modal,
			isOpen: true,
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
		}, 3000);
	};

	const hideModal = () => setModal(initialModal);

	const showModalForm = data => {
		setModalForm({
			isOpen: true,
			...data,
		});
	};

	const hideModalForm = () => setModalForm(initialModalForm);

	const data = {
		drawer,
		modal,
		modalForm,
		showDrawer,
		hideDrawer,
		showModalConfirm,
		showModalNotification,
		hideModal,
		showModalForm,
		hideModalForm,
	};

	return <UiContext.Provider value={data}>{children}</UiContext.Provider>;
};

export default UiProvider;
