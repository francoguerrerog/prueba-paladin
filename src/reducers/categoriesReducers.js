import * as types from '../actions/types';

const INITIAL_STATE = {
    categories: []
}

function categoriesReducers( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case types.LOAD_CATEGORIES:
        return { ...state, categories: action.payload };
    default:
    	return state;
  }
}

export default categoriesReducers;