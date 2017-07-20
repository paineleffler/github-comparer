var React = require('react');
var Link = require('react-router-dom').Link;
var Footer = require('./Footer');

class Home extends React.Component {
  render() {
    return (
      <div style={{textAlign:"center"}}>
        <i className="fa fa-github-alt fa-5x"></i>
        <br /><br />
        <div className="website-header-title">Github Comparer</div>
        <div className="website-header-detail">Compare users on GitHub.</div>
        <br />
        <div className="siimple-btn siimple-btn--blue">
          <Link className="react-link" to='/compare'>
            Compare!
          </Link>
        </div>
        <Footer />
      </div>
    )
  }
}

module.exports = Home;
