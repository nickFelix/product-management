import axios from 'axios';

export const PRODUCT_UPDATED = '[PRODUCT] PRODUCTS DATA UPDATED';
export const ADD_PRODUCT = '[PRODUCT] ADD PRODUCT';
export const EDIT_PRODUCT = '[PRODUCT] EDIT PRODUCT';
export const REQUEST_PRODUCT = '[PRODUCT] REQUEST PRODUCT';

export function listProducts() {
	return (dispatch) => {

		//dispatch to set loader on
		dispatch({ type: REQUEST_PRODUCT });

		axios.get('/product/list')
			.then(res => {

				//dispatch to update product list;

				let result = []

				if (res.data && !res.data.err) {
					result = res.data.result
				}

				dispatch({
					type: PRODUCT_UPDATED,
					payload: result
				})

			})
			.catch(err => {
				console.error('ops, somethings went wrong');
				console.error(err);

			})
	}
}

export function addProduct(product) {
	return dispatch => {
		dispatch({
			type: ADD_PRODUCT,
			payload: product
		})
	}
}

export function editProduct(product) {
	return dispatch => {
		dispatch({
			type: EDIT_PRODUCT,
			payload: product
		})
	}
}