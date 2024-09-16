'use client';
import { createContext, useReducer, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import {
	IoNotificationsOutline,
	IoCheckmarkCircleOutline,
	IoCloseCircleOutline,
} from 'react-icons/io5';
import { uiReducers } from './uiReducers';
import { UI_TYPES } from './uiActions';

const { SHOW_MODAL, HIDE_MODAL } = UI_TYPES;

export const UiContext = createContext(undefined);

export const initialState = {
	drawer: {
		isOpen: false,
		title: undefined,
		children: null,
	},
	modal: {
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
	},
	modalForm: {
		isOpen: false,
		title: undefined,
		children: null,
	},
};

const UiProvider = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducers, initialState);
	const { drawer, modal, modalForm } = state;

	const [loggedUser, setLoggedUser] = useState({});

	const showModalConfirm = (
		onConfirmCallback,
		{ warning = false, title, subtitle, okText },
	) => {
		dispatch({
			type: SHOW_MODAL,
			payload: {
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
			},
		});
	};

	const showModalNotification = ({ notificationText, success = true }) => {
		dispatch({
			type: SHOW_MODAL,
			payload: {
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
			},
		});
		setTimeout(() => {
			dispatch({ type: HIDE_MODAL });
		}, 1500);
	};

	const data = {
		drawer,
		modal,
		showModalConfirm,
		showModalNotification,
		modalForm,
		loggedUser,
		setLoggedUser,
		dispatch,
	};

	return <UiContext.Provider value={data}>{children}</UiContext.Provider>;
};

export default UiProvider;
