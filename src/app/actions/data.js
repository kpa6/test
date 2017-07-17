export function getNamesAction(action) {
  return {
    type: 'GET_NAMES',
    payload: action
  }
}
export function getTitlesAction(action) {
	return {
		type: 'GET_TITLES',
		payload: action
	}
}
export function updateItemsAction(action) {
	return {
		type: 'UPDATE_ITEMS',
		payload: action
	}
}