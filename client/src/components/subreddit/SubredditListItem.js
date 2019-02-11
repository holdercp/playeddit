import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

const SubredditListItem = props => {
  return (
    <ListItem button>
      <ListItemText
        primary={props.subreddit.name}
        secondary={`Subscribers: ${props.subreddit.subscriber_count}`}
      />
    </ListItem>
  );
};

export default SubredditListItem;
