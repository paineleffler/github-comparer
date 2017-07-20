var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')

function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Scala', 'Java', 'Ruby', 'Go'];

  return (
    <ul>
      {languages.map((lang) => {
        return (
          <li
            className= "languages"
            style={lang === props.selectedLanguage ? { 'fontWeight': 'bold'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
        <li key={repo.name} className='popular-item'>
          <div className='popular-rank'>#{index + 1 }</div>
          <ul className='space-list-items'>
              <li>
                <img className='popular-avatar'
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      )
    })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repo: PropTypes.array
}

SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null

    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      });
  }

  render() {
    return (
      <div style={{textAlign:"center"}}>
        <h1>Popular Repositories</h1>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? <p>LOADING</p> : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular;
