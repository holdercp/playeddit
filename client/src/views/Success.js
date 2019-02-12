import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import { Typography, Button, Grid, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';

const styles = theme => ({
  root: {
    minHeight: '60vh'
  },
  gridItem: {
    textAlign: 'center'
  },
  h1: {
    [theme.breakpoints.down('md')]: {
      fontSize: '4rem'
    }
  }
});

const Success = props => {
  const { classes } = props;

  return !props.playlist.id ? (
    <Redirect to="/" />
  ) : (
    <div>
      <MenuAppBar />
      <Grid
        container
        justify="center"
        alignItems="center"
        component="section"
        className={classes.root}
      >
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h2" align="center">
            Success!
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            You have successfully added tracks to {props.playlist.name}
          </Typography>
          <Button
            component={Link}
            to="/playlists"
            color="primary"
            size="large"
            variant="contained"
          >
            Choose another Playlist
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Success);
