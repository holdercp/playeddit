import React, { Component } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class PlaylistListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectPlaylist(this.props.playlist.id);
    this.setState({ redirect: true });
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/search" />
    ) : (
      <ListItem button onClick={this.handleClick}>
        <ListItemText
          primary={this.props.playlist.name}
          secondary={`Tracks: ${this.props.playlist.tracks.total}`}
        />
      </ListItem>
    );
  }
}

export default PlaylistListItem;
