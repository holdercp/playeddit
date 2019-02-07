import React from 'react';
import List from '@material-ui/core/List';
import SubredditListItem from './SubredditListItem';

const SubredditList = () => {
  return (
    <List>
      <SubredditListItem />
      <SubredditListItem />
      <SubredditListItem />
    </List>
  );
};

export default SubredditList;
