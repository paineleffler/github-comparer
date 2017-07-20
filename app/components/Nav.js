var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav () {
  return (
    <div className="website-header website-header--none">
      <div className="website-menu ">
        <NavLink activeClassName='active' className="website-menu-link" to='/compare'>Compare</NavLink>
        <NavLink activeClassName='active' className="website-menu-link" to='/popular'>Popular</NavLink>
        <NavLink exact activeClassName='active' className="website-menu-link" to='/'>Home</NavLink>
      </div>
    </div>
  )
}

module.exports = Nav;
