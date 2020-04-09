import auth from 'app/auth/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';
import products from '@now/components/products/products.reducer'

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		products,
		...asyncReducers
	});

export default createReducer;
