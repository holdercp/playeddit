import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import SubredditList from '../components/SubredditList';
import Grid from '@material-ui/core/Grid';

const Subreddits = props => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <Grid container justify="center" alignItems="center" component="section">
        <Grid item xs={4}>
          <SubredditList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Subreddits;
