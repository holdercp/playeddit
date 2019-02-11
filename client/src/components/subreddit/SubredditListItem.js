import React, { Component } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import Redirect from 'react-router/Redirect';

class SubredditListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectSubreddit(this.props.subreddit.name);
    this.setState({ redirect: true });
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/tracks" />
    ) : (
      <ListItem button onClick={this.handleClick}>
        <ListItemText
          primary={this.props.subreddit.name}
          secondary={`Subscribers: ${this.props.subreddit.subscriber_count}`}
        />
      </ListItem>
    );
  }
}

export default SubredditListItem;
