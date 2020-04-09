import axios from 'axios';
import qs from 'qs';

export const SAVE_PRODUCT = '[PRODUCT] SAVE PRODUCT';
export const NEWS_UPDATED = '[NEWS] NEW DATA UPDATED';

export function saveNewProduct(parameters) {

	return (dispatch) => {

		dispatch({
			type: SAVE_PRODUCT
		});

		let formData = new FormData();

		formData.append('imgUrl', parameters.file);
		formData.append('name', parameters.productName);

		axios({
			url: 'product/new',
			method: 'POST',
			data: formData
		}).then(res => {

			console.log('deu certo');

		}, err => {

			console.error('ops, something went wrong');
			console.error(err);

		})
		
	}

}