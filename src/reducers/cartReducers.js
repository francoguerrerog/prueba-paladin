import * as types from '../actions/types';

const INITIAL_STATE = {
	items: []
}

function cartReducers( state = INITIAL_STATE, action ) {
	switch ( action.type ) {
	case types.ADD_ITEM_CART:
		if (state.items.findIndex((a) => a.id === action.payload.id) > -1) {
			var tmpItems = state.items.map((a) => {
				if (a.id === action.payload.id) {
					a.cart += action.payload.cart
				}
				return a;
			});
			return { ...state, items: tmpItems };
		}
		return { ...state, items: [ ...state.items, action.payload ] }; 
	case types.REMOVE_ITEM_CART:
		var tmpItems = state.items.filter((a) => a.id !== action.payload.id);
		return { ...state, items: tmpItems };
	case types.EDIT_ITEM_CART:
		console.log(state, action);
		var tmpItems = state.items.map((a) => {
			if (a.id === action.payload.id) {
				a.cart = action.payload.cart
			}
			return a;
		});
		return { ...state, items: tmpItems };
	default:
		return state;
	}
}

export default cartReducers;