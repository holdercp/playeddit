import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: false,
    anchorEl: null
  };

  componentDidMount() {
    this.setState({ auth: this.isAuthenticated() });
  }

  isAuthenticated = () => {
    return document.cookie
      .split(';')
      .filter(item => item.includes('connect.sid=')).length;
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              playeddit
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link component={RouterLink} to="/">
                      Home
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link component={RouterLink} to="/playlists">
                      Playlists
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link component={RouterLink} to="/search">
                      Search
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link component={RouterLink} to="/subreddits">
                      Subreddits
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link component={RouterLink} to="/tracks">
                      Tracks
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                href={`${process.env.REACT_APP_HOST}/auth/spotify`}
                color="inherit"
              >
                Log In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
