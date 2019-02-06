import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import PlaylistList from '../components/PlaylistList';
import Grid from '@material-ui/core/Grid';

const Playlists = () => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <Grid container justify="center" alignItems="center" component="section">
        <Grid item xs={12}>
          <PlaylistList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Playlists;
