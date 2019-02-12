import React from 'react';
import List from '@material-ui/core/List';
import SubredditListItem from './SubredditListItem';
import { withStyles } from '@material-ui/core';
import Empty from '../Empty';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

const SubredditList = props => {
  const subreddits = props.subreddits.map(subreddit => {
    return (
      <SubredditListItem
        subreddit={subreddit}
        key={subreddit.name}
        selectSubreddit={props.selectSubreddit}
      />
    );
  });

  const { classes } = props;
  return subreddits.length > 0 ? (
    <List className={classes.root}>{subreddits}</List>
  ) : (
    <Empty />
  );
};

export default withStyles(styles)(SubredditList);
