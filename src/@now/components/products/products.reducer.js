import * as Actions from './products.actions';

const initialState = {
	products: []
};

const products = (state = initialState, action) => {
	switch (action.type) {
		case Actions.PRODUCT_UPDATED: {
			return {
				products: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default products;
