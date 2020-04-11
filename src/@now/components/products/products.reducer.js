import * as Actions from './products.actions';
import { element } from 'prop-types';

const initialState = {
	products: [],
	loading: false
};

const products = (state = initialState, action) => {
	switch (action.type) {
		case Actions.PRODUCT_UPDATED: {
			return {
				products: action.payload,
				loading: false
			};
		}

		case Actions.REQUEST_PRODUCT: {
			return {
				...state,
				loading: true
			}
		}

		case Actions.ADD_PRODUCT: {

			let newProducts = [];
			newProducts = newProducts.concat(state.products);
			newProducts.push(action.payload);

			return {
				...state,
				products: newProducts,
			}

		}

		case Actions.EDIT_PRODUCT: {

			let editProducts = [];
			let tmpProduct = action.payload;
			editProducts = editProducts.concat(state.products);

			let index = editProducts.findIndex(e => {
				return tmpProduct.id === e.id;
			});

			let product = editProducts[index];

			product = {
				...product,
				name: tmpProduct.name,
				status: tmpProduct.status ? tmpProduct.status : product.status,
				imgUrl: tmpProduct.imgUrl && tmpProduct.imgUrl !== product.imgUrl ? tmpProduct.imgUrl : product.imgUrl
			}

			editProducts.splice(index, 1, product);

			return {
				...state,
				products: editProducts
			}

		}

		default: {
			return state;
		}
	}
};

export default products;
