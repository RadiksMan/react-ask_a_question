import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { bake_cookie, read_cookie } from 'sfcookies';
import shortid  from 'shortid';

import RaisedButton from 'material-ui/RaisedButton';
import {lightBlue100} from 'material-ui/styles/colors'

import { declareUserID } from '../actions';

class Header extends Component {

  componentDidMount() {
      let userID = null;

      if ( read_cookie('asck-a-question-id').length > 0 ) {
          userID = read_cookie('asck-a-question-id');
      } else {
          userID = shortid.generate();
          bake_cookie('asck-a-question-id', userID)
      }

      this.setState({id:userID}); // ????
      this.props.declareUserID(userID);

  }
  render() {
    return (
        <div className="header">
          <div className="header-wrap">
          {/* <RaisedButton
            containerElement={<NavLink to="/"/>}
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          /> */}
              <NavLink activeClassName="selected" exact to="/">
                <RaisedButton 
                  label="Главная"
                  primary={true}
                  >
                </RaisedButton>
              </NavLink>
              <NavLink activeClassName="selected" to="/history">
                <RaisedButton
                  label="История"
                  secondary={true}
                />
              </NavLink>
              <NavLink activeClassName="selected" to="/about">
                <RaisedButton 
                  label="Про"
                  />
              </NavLink>
          </div>
        </div>
    );
  }
}

export default connect(null,{declareUserID})(Header);