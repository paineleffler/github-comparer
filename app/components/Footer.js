var React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <div className="website-footer footer">
          <div className="siimple-p">made with <span className="website-heart"></span></div> <br />
          <div id="social-media">
            <ul>
            	<li><a href="https://instagram.com/paineleffler" className="fa fa-instagram fa-lg"></a></li>
            	<li><a href="https://www.linkedin.com/in/paineleffler" className="fa fa-linkedin fa-lg"></a></li>
              <li><a href="https://www.facebook.com/paineleffler" className="fa fa-facebook fa-lg"></a></li>
              <li><a href="https://www.twitter.com/paineleffler" className="fa fa-twitter fa-lg"></a></li>
              <li><a href="https://github.com/paineleffler" className="fa fa-github fa-lg"></a></li>
              <li><a href="https://gitlab.com/paineleffler" className="fa fa-gitlab fa-lg"></a></li>
              <li><a href="https://bitbucket.org/paine" className="fa fa-bitbucket fa-lg"></a></li>
            </ul>
          </div>
      </div>
    )
  }
}
module.exports = Footer;
