import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import {  Provider  } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';

it('render MAIN width no problem', () =>{

    const store = createStore(reducer);
    const div = document.createElement('div');

    ReactDOM.render(
        <Provider store={store} >
            <Main />
        </Provider>
    ,div);
})
