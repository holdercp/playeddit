import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import TrackList from '../components/TrackList';
import Grid from '@material-ui/core/Grid';

const Subreddits = props => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <Grid container justify="center" alignItems="center" component="section">
        <Grid item xs={4}>
          <TrackList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Subreddits;
