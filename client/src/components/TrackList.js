import React from 'react';
import List from '@material-ui/core/List';
import TrackListItem from './TrackListItem';

const TrackList = () => {
  return (
    <List>
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
    </List>
  );
};

export default TrackList;
