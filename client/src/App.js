import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './views/Home';
import Playlists from './views/Playlists';
import Subreddits from './views/Subreddits';
import Tracks from './views/Tracks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: '',
      subreddit: ''
    };

    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.selectSubreddit = this.selectSubreddit.bind(this);
  }

  componentDidMount() {
    axios
      .get('/auth/check')
      .then(() => {
        console.log('Authenticated!');
      })
      .catch(err => console.error(err));
  }

  selectPlaylist(id) {
    this.setState({ playlistId: id });
  }

  selectSubreddit(name) {
    this.setState({ subreddit: name });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/playlists"
              render={props => (
                <Playlists {...props} selectPlaylist={this.selectPlaylist} />
              )}
            />
            <PrivateRoute
              path="/subreddits"
              render={props => (
                <Subreddits {...props} selectSubreddit={this.selectSubreddit} />
              )}
            />
            <PrivateRoute
              path="/tracks"
              render={props => (
                <Tracks
                  {...props}
                  subreddit={this.state.subreddit}
                  playlistId={this.state.playlistId}
                />
              )}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
