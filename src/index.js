import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router,Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

import Main from './components/Main';
import Header from './components/Header'
import History from './components/History'
import About from './components/About'
import './style/style.css';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <div className="mbox main">
                <Switch >
                    <Route path="/" exact component={Main} />
                    <Route path="/history" exact component={History} />
                    <Route path="/about" exact component={About} />
                </Switch>
                </div>
            </div>
        </Router>
    </Provider>,
    document.getElementById('App')
);