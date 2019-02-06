import React from 'react';
import List from '@material-ui/core/List';
import PlaylistListItem from './PlaylistListItem';

const PlaylistList = () => {
  return (
    <List>
      <PlaylistListItem />
      <PlaylistListItem />
      <PlaylistListItem />
    </List>
  );
};

export default PlaylistList;
