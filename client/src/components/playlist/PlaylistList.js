import React from 'react';
import List from '@material-ui/core/List';
import PlaylistListItem from './PlaylistListItem';
import { withStyles } from '@material-ui/core';

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
  return <List className={classes.root}>{playlists}</List>;
};

export default withStyles(styles)(PlaylistList);
