import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router,Switch} from 'react-router-dom';

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import {deepOrange500} from 'material-ui/styles/colors'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

import Main from './components/Main';
import Header from './components/Header'
import History from './components/History'
import About from './components/About'
import './style/style.css';

const store = createStore(reducer);

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
})

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
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
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('App')
);