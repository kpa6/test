import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App';
import './components/bundle.scss';

ReactDOM.render(
  	<Provider store={ store }>
    	<App />
  	</Provider>
  	, document.getElementById('react-root'));