import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './views/Home';
import Playlists from './views/Playlists';
import Search from './views/Search';
import Subreddits from './views/Subreddits';
import Tracks from './views/Tracks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <React.Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/playlists" component={Playlists} />
            <Route path="/search" component={Search} />
            <Route path="/subreddits" component={Subreddits} />
            <Route path="/tracks" component={Tracks} />
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
