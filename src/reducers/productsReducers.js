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
		return { ...state, filterProducts: filterData };
	case types.CHECK_OUT:
		const tmpProducts = state.products.map((a) => {
			const value = action.payload.filter((b) => b.id === a.id).map((b) => b.cart );
			if (value.length > 0) {
				a.quantity -= value[0]
			}
			return a;
		})
		return { ...state, products: tmpProducts };
	default:
		return state;
	}
}

export default productsreducers;