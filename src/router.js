import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/Layout/IndexPage';
import MainLayout from './routes/Layout/MainLayout';
import NotFound from './routes/Layout/NotFound';

import AnalytiPage from './routes/AnalytiPage';
import Daily from './routes/Analytical/Daily';
import Monthly from './routes/Analytical/Monthly';
import Version from './routes/Analytical/Version';
import CompanySetting from './routes/Setting/CompanySetting';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={IndexPage} />
        <Route path="analyic/" component={ AnalytiPage }>
            <Route path="monthly" component={Monthly} />
            <Route path="daily" component={Daily} />
            <Route path="version" component={Version} />
        </Route>
        <Route path="setting/managent" component={ CompanySetting } />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};
