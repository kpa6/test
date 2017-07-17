import { createStore } from 'redux';
import rootReducer from './reducers/index';
				 
const defaultState = { 
	data: {
		titles: {},
		names: [],
		items: {}
	}
};

let store;

// added check for window object present to avoid tests break 
if (typeof(window) !== 'undefined') {
	store = createStore(
		rootReducer, 
		defaultState, 
	 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
} else {
	store = createStore(
		rootReducer, 
		defaultState
	)
}

export default store;