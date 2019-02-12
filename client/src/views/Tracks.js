import React, { Component } from 'react';
import MenuAppBar from '../components/MenuAppBar';
import TrackList from '../components/track/TrackList';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Typography, LinearProgress, Button } from '@material-ui/core';
import Redirect from 'react-router-dom/Redirect';

class Tracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      loading: true,
      selectedTrackURIs: [],
      redirect: false,
      redirectTo: '/'
    };

    this.updateTrackURIs = this.updateTrackURIs.bind(this);
    this.submitTracks = this.submitTracks.bind(this);
  }

  componentDidMount() {
    if (!this.props.playlist.id) {
      this.setState({ redirect: true });
    } else {
      axios
        .get(`/subreddit/${this.props.subreddit}`)
        .then(response => {
          this.setState({ tracks: response.data, loading: false });
        })
        .catch(err => console.log(err));
    }
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
      .post(`/playlist/${this.props.playlist.id}/addTracks`, {
        data: {
          uris: this.state.selectedTrackURIs
        }
      })
      .then(() => {
        this.setState({ redirect: true, redirectTo: '/success' });
      })
      .catch(err => console.error(err));
  }

  render() {
    return this.state.redirect ? (
      <Redirect to={this.state.redirectTo} />
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
              Add tracks to {this.props.playlist.name} from{' '}
              {this.props.subreddit}
            </Typography>
            {this.state.loading ? (
              <LinearProgress />
            ) : (
              <React.Fragment>
                <TrackList
                  tracks={this.state.tracks}
                  updateTrackURIs={this.updateTrackURIs}
                />
                {this.state.tracks.length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.submitTracks}
                    disabled={this.state.selectedTrackURIs.length === 0}
                  >
                    Add Tracks
                  </Button>
                )}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Tracks;
