import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/Layout/IndexPage';
import MainLayout from './routes/Layout/MainLayout';
import NotFound from './routes/Layout/NotFound';

import Demo from './routes/Demo';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={IndexPage} />
        <Route path="demo" component={Demo} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};
