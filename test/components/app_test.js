import { renderComponent, expect, TestUtils } from '../test_helper';

import App from '../../src/app/components/App';
import { testData, testState } from '../test_data';
import { getNamesAction, getTitlesAction, updateItemsAction } from '../../src/app/actions/'
import dataReducer from '../../src/app/reducers';

let component;

component = renderComponent(App, null, testState);

describe('Application render', () => {

	it('renders main component', () => {
		expect(component).to.exist;
	});

	it('renders 4 fieldsets', () => {
		expect( component.find('.fieldset') ).to.have.lengthOf(4);
	});

	it('renders correct fieldset layout', () => {
		expect( component.find('.fieldset').first().find('table th') ).to.have.lengthOf(4);
		expect( component.find('.fieldset').last().find('table th') ).to.have.lengthOf(4);
		
		expect( component.find('.fieldset').first().find('table td') ).to.have.lengthOf(3);
		expect( component.find('.fieldset').last().find('table td') ).to.have.lengthOf(3);
	});

});

describe('Application reducers', () => {
	it('handles action with unknown type', () => {
		const action = { type: 'UNKNOWN_REDUCER', payload: '' }
		expect( dataReducer({data:''}, action) ).to.be.an.instanceof(Object);
	})
	it('handles GET_NAMES', () => {
		const action = { type: 'GET_NAMES', payload: testData }
		expect( dataReducer(testState, action) ).to.be.eql(testState);
	})
	it('handles GET_TITLES', () => {
		const action = { type: 'GET_TITLES', payload: testData }
		expect( dataReducer(testState, action) ).to.be.eql(testState);
	})
	it('handles UPDATE_ITEMS', () => {
		const action = { type: 'UPDATE_ITEMS', payload: testData }
		expect( dataReducer(testState, action) ).to.be.eql(testState);
	})
})

describe('Application actions', () => {

	describe('getNamesAction', () => {
		it ('has the correct type', () => {
			const action = getNamesAction();
			expect(action.type).to.equal('GET_NAMES')
		})
		it ('has the correct payload', () => {
			const action = getNamesAction(testData);
			expect(action.payload).to.eql(testData)
		})
	})
	describe('getTitlesAction', () => {
		it ('has the correct type', () => {
			const action = getTitlesAction();
			expect(action.type).to.equal('GET_TITLES')
		})
		it ('has the correct payload', () => {
			const action = getTitlesAction(testData);
			expect(action.payload).to.eql(testData)
		})
	})
	describe('updateItemsAction', () => {
		it ('has the correct type', () => {
			const action = updateItemsAction();
			expect(action.type).to.equal('UPDATE_ITEMS')
		})
		it ('has the correct payload', () => {
			const action = updateItemsAction(testData);
			expect(action.payload).to.eql(testData)
		})
	})

})
