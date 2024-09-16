import { UI_TYPES } from './uiActions';
import { initialState } from './UiContext';

const {
	SHOW_DRAWER,
	HIDE_DRAWER,
	SHOW_MODAL,
	HIDE_MODAL,
	SHOW_MODAL_FORM,
	HIDE_MODAL_FORM,
} = UI_TYPES;

export const uiReducers = (state, action) => {
	switch (action.type) {
		case SHOW_DRAWER:
			return {
				...state,
				drawer: { isOpen: true, ...action.payload },
			};

		case HIDE_DRAWER:
			return {
				...state,
				drawer: initialState.drawer,
			};

		case SHOW_MODAL:
			return {
				...state,
				modal: action.payload,
			};

		case HIDE_MODAL:
			return {
				...state,
				modal: initialState.modal,
			};

		case SHOW_MODAL_FORM:
			return {
				...state,
				modalForm: { isOpen: true, ...action.payload },
			};

		case HIDE_MODAL_FORM:
			return {
				...state,
				modalForm: initialState.modalForm,
			};

		default:
			return state;
	}
};
