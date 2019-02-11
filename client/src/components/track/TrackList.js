import React from 'react';
import List from '@material-ui/core/List';
import TrackListItem from './TrackListItem';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

const TrackList = props => {
  const tracks = props.tracks.map(track => {
    return (
      <TrackListItem
        track={track}
        key={track.id}
        updateTrackURIs={props.updateTrackURIs}
      />
    );
  });

  const { classes } = props;
  return <List className={classes.root}>{tracks}</List>;
};

export default withStyles(styles)(TrackList);
