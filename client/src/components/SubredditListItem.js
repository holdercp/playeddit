import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const SubredditListItem = () => {
  return (
    <ListItem>
      <ListItemText>Subreddit</ListItemText>
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

export default SubredditListItem;
