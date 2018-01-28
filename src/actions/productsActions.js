import * as types from './types';

export function loadProducts( products ) {
	return {
		type: types.LOAD_PRODUCTS,
		payload: products
	};
}

export function filterProductsBySublevel( id ) {
	return {
		type: types.FILTER_PRODUCTS_BY_SUBLEVEL,
		payload: id
	};
}