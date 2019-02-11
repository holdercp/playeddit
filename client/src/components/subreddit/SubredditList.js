import React from 'react';
import List from '@material-ui/core/List';
import SubredditListItem from './SubredditListItem';
import { withStyles } from '@material-ui/core';

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
  return <List className={classes.root}>{subreddits}</List>;
};

export default withStyles(styles)(SubredditList);
