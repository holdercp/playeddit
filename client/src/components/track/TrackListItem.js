import React, { Component } from 'react';
import { ListItem, ListItemText, Checkbox } from '@material-ui/core';

class TrackListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(state => ({ checked: !state.checked }));
    this.props.updateTrackURIs(this.props.track.uri);
  }

  render() {
    return (
      <ListItem button onClick={this.handleToggle}>
        <ListItemText
          primary={this.props.track.name}
          secondary={this.props.track.artists[0].name}
        />
        <Checkbox checked={this.state.checked} tabIndex={-1} disableRipple />
      </ListItem>
    );
  }
}

export default TrackListItem;
