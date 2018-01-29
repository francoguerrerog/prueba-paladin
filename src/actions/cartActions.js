import * as types from './types';

export function addItem( item ) {
	return {
		type : types.ADD_ITEM_CART,
		payload : item
	}
};

export function removeItem( item ) {
	return {
		type : types.REMOVE_ITEM_CART,
		payload : item
	}
};

export function editItem( item ) {
	return {
		type : types.EDIT_ITEM_CART,
		payload : item
	}
};