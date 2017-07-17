import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/app/reducers';
import store from '../src/app/store';

import EventSource from 'eventsourcemock';
 
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.window.EventSource = EventSource;

global.navigator = {
  userAgent: 'node.js',
};

const $ = _$(window);


chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance = mount(
      <Provider store={createStore( reducers, state )}>
        <ComponentClass { ...props } />
      </Provider>
    );
  return componentInstance;
}

$.fn.simulate = function (eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect, TestUtils };
