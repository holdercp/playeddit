import React, { Component } from 'react';
import { Grid, TextField, Typography, LinearProgress } from '@material-ui/core';
import MenuAppBar from '../components/MenuAppBar';
import axios from 'axios';
import Redirect from 'react-router-dom/Redirect';
import SubredditList from '../components/subreddit/SubredditList';

class Subreddits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectTo: '/',
      loading: false,
      subreddits: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.playlist.id) {
      this.setState({ redirect: true, redirectTo: '/playlists' });
    }
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      this.setState({ loading: true });

      const query = event.target.value;
      axios
        .get('/subreddit/search', {
          params: {
            query
          }
        })
        .then(response => {
          this.setState({
            subreddits: response.data.subreddits,
            loading: false
          });
        })
        .catch(err => {
          console.error(err);
          this.setState(() => ({
            redirect: true
          }));
        });
    }
  }

  render() {
    const { redirect } = this.state;
    return redirect ? (
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
          <Grid item xs={4}>
            {this.state.subreddits.length ? (
              <React.Fragment>
                <Typography gutterBottom variant="h6">
                  Select a subreddit
                </Typography>
                <SubredditList
                  subreddits={this.state.subreddits}
                  selectSubreddit={this.props.selectSubreddit}
                />
              </React.Fragment>
            ) : this.state.loading ? (
              <LinearProgress />
            ) : (
              <React.Fragment>
                <Typography gutterBottom variant="h6">
                  Search for Subreddits
                </Typography>
                <TextField
                  fullWidth
                  id="standard-search"
                  label="Search field"
                  type="search"
                  margin="normal"
                  onKeyPress={this.handleSubmit}
                />
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Subreddits;
