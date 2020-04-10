import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import products from '@now/components/products/products.reducer';
import productDialog from '@now/components/productDialog/productDialog.reducer';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		products,
		productDialog,
		...asyncReducers
	});

export default createReducer;
