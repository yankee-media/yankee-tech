import React, { useState } from 'react';

// UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';

// Icons
import Search from '@material-ui/icons/Search';

// Custom Components
import SearchTile from './SearchTile';

// Util
import { MATERIAL_RED, ARTICLE_ID } from '../../util/constants';
import { Divider } from '@material-ui/core';

const SearchPageInner = ({ executeSearch, searchQuery, history, searchResults, setSearchQuery, searchHitNum }) => {
  const [pageParameters, setPageParameters] = useState({ sortBy: '' });
  const changeParameters = e => {
    const newParameters = { ...pageParameters, [e.target.id]: e.target.value };
    executeSearch(searchQuery.previous, newParameters);
    setPageParameters(newParameters);
  }
  const getZeroResultsMessage = (query, searchResultsAreZero) => {
    if (searchResultsAreZero) {
      return !!query ? (
        <div style={{ textAlign: 'center' }}>
          <Typography variant='h6' style={{ display: 'inline' }}>Your query for </Typography>
          <Typography variant='h6' style={{ display: 'inline' }} color='primary'>&nbsp;&nbsp;{`"${searchQuery.previous}"`}&nbsp;&nbsp;</Typography>
          <Typography variant='h6' style={{ display: 'inline' }}> returned zero results</Typography>
        </div>
      ) : (
          <Typography align='center' variant='h6'>Use the Search Box Above to Search for Articles</Typography>
        );
    }
  }
  return (
    <div>
      <div style={{ backgroundColor: MATERIAL_RED, height: '75px' }}>
        <form onSubmit={e => {
          e.preventDefault();
          executeSearch(searchQuery.current, pageParameters);
          history.push(`/search?q=${searchQuery.current}`);
          setSearchQuery({ ...searchQuery, previous: searchQuery.current });
        }}>
          <div style={{ width: '65%', margin: 'auto', textAlign: 'center', paddingTop: '10px' }}>
            <TextField style={{ width: '75%', maxWidth: '500px', minWidth: '75px' }} color='secondary' margin='dense' variant='outlined' value={searchQuery.current} onChange={e => setSearchQuery({ ...searchQuery, current: e.target.value })} />
            <Button style={{ margin: '10px 0 4px 8px', width: '10%' }} variant='contained' color='secondary' type='submit'><Search /></Button>
          </div>
        </form>
      </div>
      <div style={{ maxWidth: '1200px', margin: '15px auto 0 auto', padding: '8px' }}>
        {Array.isArray(searchResults) && (searchResults.length > 0) ? (
          <div>
            <div style={{ display: 'flex' }}>
              <Typography style={{ lineHeight: '40px' }}>{searchHitNum} Result{searchHitNum > 1 && 's'}</Typography>
              <span style={{ flex: 1 }}></span>
              <Typography style={{ lineHeight: '40px' }}>Sort By:&nbsp;&nbsp;</Typography>
              <Select
                style={{width: '140px'}}
                native
                variant='outlined'
                margin='dense'
                inputProps={{
                  id: 'sortBy'
                }}
                value={pageParameters.sortBy}
                onChange={changeParameters}
              >
                <option value='' >Relevance</option>
                <option value='recent'>Most Recent</option>
              </Select>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Divider />
            </div>
            {searchResults.map(article => <SearchTile key={article[ARTICLE_ID]} article={article} />)}
          </div>
        ) : (
            getZeroResultsMessage(searchQuery, searchResults.length <= 0)
          )}
      </div>
    </div>
  )
}

export default SearchPageInner;