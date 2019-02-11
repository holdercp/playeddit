import React, { Component } from 'react';
import MenuAppBar from '../components/MenuAppBar';
import TrackList from '../components/track/TrackList';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Typography, LinearProgress, Button } from '@material-ui/core';

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      loading: true,
      selectedTrackURIs: []
    };

    this.updateTrackURIs = this.updateTrackURIs.bind(this);
    this.submitTracks = this.submitTracks.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/subreddit/${this.props.subreddit}`)
      .then(response => {
        this.setState({ tracks: response.data, loading: false });
      })
      .catch(err => console.log(err));
  }

  updateTrackURIs(trackURI) {
    if (this.state.selectedTrackURIs.includes(trackURI)) {
      this.setState(prevState => ({
        selectedTrackURIs: prevState.selectedTrackURIs.filter(
          uri => uri !== trackURI
        )
      }));
    } else {
      this.setState(prevState => ({
        selectedTrackURIs: [...prevState.selectedTrackURIs, trackURI]
      }));
    }
  }

  submitTracks() {
    axios
      .post(`/playlist/${this.props.playlistId}/addTracks`, {
        data: {
          uris: this.state.selectedTrackURIs
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <React.Fragment>
        <MenuAppBar />
        <Grid
          container
          justify="center"
          alignItems="center"
          component="section"
        >
          <Grid item xs={4}>
            <Typography gutterBottom variant="h6">
              Add tracks to playlist
            </Typography>
            {this.state.loading ? (
              <LinearProgress />
            ) : (
              <React.Fragment>
                <TrackList
                  tracks={this.state.tracks}
                  updateTrackURIs={this.updateTrackURIs}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.submitTracks}
                >
                  Add Tracks
                </Button>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Tracks;
