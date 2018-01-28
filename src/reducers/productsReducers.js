import * as types from '../actions/types';

const INITIAL_STATE = {
	products: [],
	filterProducts: [],
}

function productsreducers( state = INITIAL_STATE, action ) {
	switch ( action.type ) {
		case types.LOAD_PRODUCTS:
			return { ...state, products: action.payload };
		case types.FILTER_PRODUCTS_BY_SUBLEVEL:
			const filterData = state.products.filter((a) => {
				return a.sublevel_id === action.payload;
			})
			console.log(filterData);
			return { ...state, filterProducts: filterData };
		default:
			return state;
	}
}

export default productsreducers;