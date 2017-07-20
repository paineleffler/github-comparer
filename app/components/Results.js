var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');

function Profile(props) {
  var info = props.info;
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}
Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player (props){
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    var players = queryString.parse(this.props.location.search)
    api.compare([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (results) {
      if(results === null) {
        return this.setState(function(){
          return {
            error: 'Hey theres an error',
            loading: false
          }
        });
      }
      this.setState(function (){
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    }.bind(this));
  }
  render() {
    if(this.state.loading) {
      return (<p>Loading</p>)
    }

    if (this.state.error) {
      return (
        <div>
          <p>{this.state.error}</p>
          <Link to='/compare'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={this.state.winner.score}
          profile={this.state.winner.profile}
        />
        <Player
          label='Loser'
          score={this.state.loser.score}
          profile={this.state.loser.profile}
        />

      </div>
    )
  }
}

module.exports = Results;
