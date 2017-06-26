import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Header extends Component {

  render() {
    return (
      <div className="header">
        <div className="header-wrap">
            <NavLink activeClassName="selected" exact to="/">Главная</NavLink>
            <NavLink activeClassName="selected" to="/history">История</NavLink>
            <NavLink activeClassName="selected" to="/about">Про</NavLink>
        </div>
      </div>
    );
  }
}

export default  Header;