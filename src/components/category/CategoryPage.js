import React, { useEffect, useState } from 'react';

import { withRouter } from 'react-router-dom';
import CategoryPageInner from './CategoryPageInner';

const CategoryPage = props => {
  const [category, setCategory] = useState('');
  useEffect(() => {
    const paramsCategory = props.match.params.category;
    if (!paramsCategory) {
      props.history.push('/');
    } else {
      setCategory(paramsCategory)
    }
  }, [props.match.params.category, props.history]);
  return <CategoryPageInner category={category} />
}

export default withRouter(CategoryPage);