import React, { Component } from 'react';
import MenuAppBar from '../components/MenuAppBar';
import PlaylistList from '../components/playlist/PlaylistList';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      redirect: false
    };
  }

  componentDidMount() {
    axios
      .get('/playlist')
      .then(response => {
        this.setState({ playlists: response.data });
      })
      .catch(err => {
        console.error(err);
        this.setState(() => ({
          redirect: true
        }));
      });
  }

  render() {
    const { redirect } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <MenuAppBar />
        <Grid
          container
          justify="center"
          alignItems="center"
          component="section"
        >
          <Grid item xs={4}>
            <PlaylistList playlists={this.state.playlists} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Playlists;
