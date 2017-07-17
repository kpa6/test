import React from 'react';
import { connect } from 'react-redux';
import { getNamesAction, getTitlesAction, updateItemsAction } from '../actions'
import EventSource from 'eventsourcemock';


import PropTypes from 'prop-types';

class App extends React.Component {
		
	componentWillMount() {
		// use window.EventSource to make code work in tests and in the browser  //
		this.source = new window.EventSource('https://jsdemo.envdev.io/sse');

		// parse the results and send actions for each EventSource update
		this.source.onmessage = message => {
			let parsedData;

			try { 
				parsedData = JSON.parse( message.data ); 
			} catch(e) {
				alert(`Wrong data format\n${e}`);
				this.source.close();
				return;
			}

			// send an action to get necessary names for fieldsets
			this.props.getNames( parsedData );

			//send an action to get necessary titles for tables
			this.props.getTitles( parsedData );

			//send an action to update items in the table rows
			this.props.updateItems( parsedData );
		}
	}
	componentWillUnmount() {
		this.source.close();
	}
	render() { 

		const fieldset = this.props.names.map( (title, index) => { 
			return(
				// build fieldset for each sensor with data in the table 
				<fieldset className="fieldset" key={ index }> 
					<legend>{ title }</legend >
					{<table className="fieldset-table">
						<thead>
							<tr>
								{
									/* generate table titles */
									this.props.titles[title] && this.props.titles[title].map(( item, index ) => {
										return ( <th key={ index }>{ item }</th> )
									})
								}
							</tr>
						</thead>
						<tbody>
							<tr>
								{
									/* update rows with sensors data */
									this.props.titles[title] && this.props.titles[title].map(( item, index ) => {
										// loop through all sensor names and return a row with new data 
										return ( this.props.items[title] && Object.keys( this.props.items[title] ).map(( el, index ) => {
											// return row only if names of sensors and names in the data match 
											if (item == el && index != 0) {
												// check if data is an array, if it is, then make a string from it
												if (Array.isArray(this.props.items[title][el]))
													return (<td className={ el }>{ this.props.items[title][el].join(';\n') }</td> );
												else 
													return (<td className={ el }>{ this.props.items[title][el] }</td>)
											}
										}));
									})									
								}
							</tr>
						</tbody>
					</table>}
				</fieldset> 
			)
		})
		return (
			<div className="container">
				{ fieldset }
			</div>  
		);
	}
}

const mapStateToProps = state => {
	return {
		titles: state.data.titles,
		names: state.data.names,
		items: state.data.items
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getNames: action => dispatch( getNamesAction( action ) ),
		getTitles: action => dispatch( getTitlesAction( action ) ),
		updateItems: action => dispatch( updateItemsAction( action ) )
	}
}

App.propTypes = {
	titles: PropTypes.object.isRequired,
	names: PropTypes.array.isRequired,
	items: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

