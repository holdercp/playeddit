import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import { Typography, Grid, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <MenuAppBar />
      <Grid container justify="center" alignItems="center" component="section">
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            404 Not Found :(
          </Typography>
          <Typography align="center">
            <Link component={RouterLink} to="/">
              Take me home, please.
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
