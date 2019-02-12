import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Empty = () => {
  return (
    <div>
      <Typography variant="h4" color="secondary" gutterBottom>
        No results :(
      </Typography>
      <Link color="primary" component={RouterLink} to="/subreddits">
        Search Again
      </Link>
    </div>
  );
};

export default Empty;
