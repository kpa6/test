function data(state = {}, action) {
	switch(action.type) {

		//get names for fieldsets and update them if it necessary
		case 'GET_NAMES': {

			//loop through the data and add new names to the state
			const names = action.payload.map( item  => {
				if (!state.names.includes(item.name) ) {
	            	return item.name;
				}
	        }).filter(item => item);

			// only if new names have appeared return updated state 
	        if (names.length > 0) {
	        	return { ...state, names: [ ...state.names, ...names ] }
	        }

	        return state;
			break;	
		}

		//get titles for table and update them if it necessary
		case 'GET_TITLES': {

			//loop through the data and add new titles to the state
			const titlesArr = action.payload.map( item  => {
				if (!state.titles[item.name] ) {
					let itemTitles = Object.keys(item);
					itemTitles.shift();

	            	return { [item.name]: [...itemTitles] };
				}
	        }).filter(item => item);

			// only if new titles are present return updated state 
			const titles = titlesArr.length && Object.assign(...titlesArr);
	        if (titles) {
	        	
	        	return { 
	        		...state, 
	        		titles: {
	        			...state.titles,
	        			...titles
	        		} 
	        	}

	        }
	        return state;
			break;	
		}

		//update table row with new data
		case 'UPDATE_ITEMS': {
			const itemsArr = action.payload.map( item => { return { [item.name]: {...item} } })
			const items = itemsArr.length && Object.assign(...itemsArr);

	        return {
	        	...state,
	        	items: {
	        		...state.items,
	        		...items
	        	}
	        };
			break;	
		}
		default:
			return state;
	}
	return state;

}
export default data;