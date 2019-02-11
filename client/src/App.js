import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './views/Home';
import Playlists from './views/Playlists';
import Subreddits from './views/Subreddits';
import Tracks from './views/Tracks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: ''
    };

    this.selectPlaylist = this.selectPlaylist.bind(this);
  }

  selectPlaylist(id) {
    this.setState({ playlistId: id });
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
            <PrivateRoute path="/subreddits" component={Subreddits} />
            <PrivateRoute path="/tracks" render={Tracks} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
