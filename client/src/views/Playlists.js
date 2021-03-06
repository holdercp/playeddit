import React, { Component } from 'react';
import MenuAppBar from '../components/MenuAppBar';
import PlaylistList from '../components/playlist/PlaylistList';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Typography, LinearProgress } from '@material-ui/core';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      redirect: false,
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get('/playlist')
      .then(response => {
        this.setState({ playlists: response.data, loading: false });
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
          <Grid item xs={10} md={6} lg={4}>
            <Typography gutterBottom variant="h6">
              Select a playlist
            </Typography>
            {this.state.loading ? (
              <LinearProgress />
            ) : (
              <PlaylistList
                playlists={this.state.playlists}
                selectPlaylist={this.props.selectPlaylist}
              />
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Playlists;
