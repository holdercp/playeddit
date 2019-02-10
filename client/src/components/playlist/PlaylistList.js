import React from 'react';
import List from '@material-ui/core/List';
import PlaylistListItem from './PlaylistListItem';

const PlaylistList = props => {
  const playlists = props.playlists.map(playlist => (
    <PlaylistListItem playlist={playlist} key={playlist.id} />
  ));
  return <List>{playlists}</List>;
};

export default PlaylistList;
