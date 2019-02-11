import React, { Component } from 'react';
import { Grid, TextField } from '@material-ui/core';
import MenuAppBar from '../components/MenuAppBar';
import axios from 'axios';
import Redirect from 'react-router-dom/Redirect';
import SubredditList from '../components/subreddit/SubredditList';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: false,
      subreddits: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
            {this.state.subreddits.length ? (
              <SubredditList subreddits={this.state.subreddits} />
            ) : (
              <TextField
                fullWidth
                id="standard-search"
                label="Search field"
                type="search"
                margin="normal"
                onKeyPress={this.handleSubmit}
              />
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Search;
