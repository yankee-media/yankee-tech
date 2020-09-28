import React, { useState } from 'react';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

// Util
import { MATERIAL_RED } from '../../util/constants';

// Router
import { withRouter } from 'react-router-dom';

const Search = props => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div style={{ width: '65%', margin: 'auto' }}>
          <Typography variant='h5' style={{ textAlign: 'center', textDecoration: 'underline', textDecorationColor: MATERIAL_RED, marginBottom: '8px' }}>Search</Typography>
          <form onSubmit={e => {
            e.preventDefault();
            props.history.push(`/search?q=${encodeURIComponent(searchValue)}`);
          }}>
            <TextField
              variant='outlined'
              fullWidth
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'><IconButton type='submit'><SearchIcon /></IconButton></InputAdornment>),
              }} />
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default withRouter(Search);