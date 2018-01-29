import { combineReducers } from 'redux';

import productsReducers from './productsReducers';
import categoriesReducers from './categoriesReducers';
import cartReducers from './cartReducers';

const rootReducer = combineReducers({
	products: productsReducers,
	categories: categoriesReducers,
	cart: cartReducers
});

export default rootReducer;
