import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Typography component="h2" variant="h1" gutterBottom>
          Hello World!
        </Typography>
      </React.Fragment>
    );
  }
}

export default App;
