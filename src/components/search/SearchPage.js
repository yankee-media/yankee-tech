import React, { useState, useEffect } from 'react';

// Router
import { withRouter } from 'react-router-dom';

// Custom Components
import SearchPageInner from './SearchPageInner';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { executeSearch } from '../../store/actions';

const SearchPage = ({ location, executeSearch, history, searchResults, searchHitNum }) => {
  const [searchQuery, setSearchQuery] = useState({ current: '', previous: '' });
  const [initialQuery, setInitialQuery] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (!initialQuery) {
      if (!(query === null)) {
        setSearchQuery({ current: query, previous: query });
        executeSearch(query);
      }
      setInitialQuery(true);
    }
  }, [location.search, executeSearch, initialQuery]);
  return <SearchPageInner
    searchResults={searchResults}
    searchHitNum={searchHitNum}
    history={history}
    searchQuery={searchQuery}
    executeSearch={executeSearch}
    setSearchQuery={setSearchQuery} />
}

const mapStateToProps = ({ appReducer }) => {
  return {
    searchResults: appReducer.searchResults,
    searchHitNum: appReducer.searchHitNum
  }
}

const mapDispatchToProps = dispatch => {
  return {
    executeSearch: (query, params) => dispatch(executeSearch(query, params))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(SearchPage);