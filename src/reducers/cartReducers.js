import * as types from '../actions/types';

const INITIAL_STATE = {
	items: []
}

function cartReducers( state = INITIAL_STATE, action ) {
	switch ( action.type ) {
	case types.ADD_ITEM_CART:
		return { ...state, items: [ ...state.items, action.payload ] };
	case types.REMOVE_ITEM_CART:
		return { ...state, items: [ ...state.items, ...action.payload ] }; 
	case types.EDIT_ITEM_CART:
		return { ...state, items: [ ...state.items, ...action.payload ] };
	default:
		return state;
	}
}

export default cartReducers;