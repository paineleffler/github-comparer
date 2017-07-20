var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        username: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label className='siimple-label' htmlFor='username'>
            {this.props.label}
          </label>
          <br />
          <input
            className="siimple-input username-input"
            id='username'
            placeholder='github username'
            type='text'
            autoComplete='off'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className='siimple-btn siimple-btn--blue'
            type='submit'
            disabled={!this.state.username}>
              Submit
          </button>
        </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Compare extends React.Component {
constructor(props) {
  super(props);

  this.state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleReset = this.handleReset.bind(this);
}
handleReset(id) {
  this.setState(function () {
    var newState = {};
    newState[id + 'Name'] = '';
    newState[id + 'Image'] = null;
    return newState;
  });
}
handleSubmit(id, username) {
  this.setState(function (){
    var newState = {}
    newState[`${id}Name`] = username;
    newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
    return newState;
  });
}
  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;

    return (
      <div style={{textAlign:"center"}}>
        <h1>Compare GitHub Users</h1>
        <h3>Enter two usernames that you would like to compare</h3>
        <div className="siimple-grid">
          <div className="siimple-grid-row">
            <div className="siimple-grid-col siimple-grid-col--3"></div>
            <div className="siimple-grid-col siimple-grid-col--3">
            {!playerOneName &&
              <PlayerInput
                id='playerOne'
                label='Profile 1'
                onSubmit={this.handleSubmit}
            />}

            {playerOneImage !== null &&
              <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}>
                  <button
                    className='siimple-btn siimple-btn--orange'
                    onClick={this.handleReset.bind(null, 'playerOne')}>
                      Reset
                  </button>
            </PlayerPreview>}
          </div>
          <div className="siimple-grid-col siimple-grid-col--3">
            {!playerTwoName &&
              <PlayerInput
                id='playerTwo'
                label='Profile 2'
                onSubmit={this.handleSubmit}
            />}

            {playerTwoImage !== null &&
              <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}>
                <button
                  className='siimple-btn siimple-btn--orange'
                  onClick={this.handleReset.bind(null, 'playerTwo')}>
                    Reset
                </button>
              </PlayerPreview>}
            </div>
            <div className="siimple-grid-col siimple-grid-col--3"></div>
          </div>
        </div>
        <br />
        {playerOneImage && playerTwoImage &&
          <Link className='siimple-btn siimple-btn--blue' to={{
              pathname: match.url +'/results',
              search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Compare
          </Link>
        }
      </div>
    )
  }
}

module.exports = Compare;
