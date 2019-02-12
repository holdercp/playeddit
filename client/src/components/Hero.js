import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import isAuthed from '../auth';
import Link from 'react-router-dom/Link';

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

const Hero = props => {
  const { classes } = props;

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      component="section"
      className={classes.root}
    >
      <Grid item xs={12} className={classes.gridItem}>
        <Typography
          align="center"
          gutterBottom
          variant="h1"
          className={classes.h1}
        >
          playeddit
        </Typography>
        <Typography align="center" variant="body1" paragraph>
          Create Spotify playlists from hot posts in your favorite subreddits.
        </Typography>

        {!isAuthed() ? (
          <Button
            href={`${process.env.REACT_APP_HOST}/auth/spotify`}
            color="primary"
            size="large"
            variant="contained"
          >
            Log In With Spotify
          </Button>
        ) : (
          <Button
            component={Link}
            to="/playlists"
            color="primary"
            size="large"
            variant="contained"
          >
            Choose a Playlist
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Hero);
