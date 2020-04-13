import * as Actions from '../actions';

const initialState = {
	isAuthorized: false,
	role: ['admin'],//guest
	data: {
		displayName: 'John Doe',
		email: 'johndoe@withinpixels.com',
	}
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_USER_DATA: {
			return {
				...initialState,
				...action.payload
			};
		}
		case Actions.REMOVE_USER_DATA: {
			return {
				...initialState
			};
		}
		case Actions.USER_LOGGED_OUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default user;
