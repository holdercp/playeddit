import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const TrackListItem = () => {
  return (
    <ListItem>
      <ListItemText>TrackTitle</ListItemText>
      <ListItemSecondaryAction>
        <ListItemIcon>
          <IconButton>
            <AddIcon />
          </IconButton>
        </ListItemIcon>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TrackListItem;
