import * as types from './types';

export function loadCategories( categories ) {
	return {
		type : types.LOAD_CATEGORIES,
		payload : categories
	}
};