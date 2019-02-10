import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import MenuAppBar from '../components/MenuAppBar';

const Search = props => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <Grid container justify="center" alignItems="center" component="section">
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="standard-search"
            label="Search field"
            type="search"
            margin="normal"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Search;
