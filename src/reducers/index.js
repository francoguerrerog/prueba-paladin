import { combineReducers } from 'redux';

import productsReducers from './productsReducers';
import categoriesReducers from './categoriesReducers';

const rootReducer = combineReducers({
    products: productsReducers,
    categories: categoriesReducers,
});

export default rootReducer;
