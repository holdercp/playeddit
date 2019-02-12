import React from 'react';
import List from '@material-ui/core/List';
import PlaylistListItem from './PlaylistListItem';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

const PlaylistList = props => {
  const playlists = props.playlists.map(playlist => (
    <PlaylistListItem
      playlist={playlist}
      key={playlist.id}
      selectPlaylist={props.selectPlaylist}
    />
  ));

  const { classes } = props;
  return playlists.length > 0 ? (
    <List className={classes.root}>{playlists}</List>
  ) : (
    <Typography variant="body1">
      It appears you have no Spotify playlists. Go make one. I'll wait.
    </Typography>
  );
};

export default withStyles(styles)(PlaylistList);
