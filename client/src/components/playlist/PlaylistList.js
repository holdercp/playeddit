import React, { Component } from 'react';
import List from '@material-ui/core/List';
import PlaylistListItem from './PlaylistListItem';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

class PlaylistList extends Component {
  render() {
    const playlists = this.props.playlists.map(playlist => (
      <PlaylistListItem
        playlist={playlist}
        key={playlist.id}
        selectPlaylist={this.props.selectPlaylist}
      />
    ));
    const { classes } = this.props;
    return <List className={classes.root}>{playlists}</List>;
  }
}

export default withStyles(styles)(PlaylistList);
