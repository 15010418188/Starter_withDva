import React, { Component, PropTypes } from 'react';
import { Row , Col } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import TreeView from './TreeView';

const AnalytiPage  = ( { children }) => {
  const click = () => {
      dispatch({  type: 'example/fetchRemote' })
  }
  return (
    <Row gutter={40}>
      <Col span={6}>
        <TreeView />
      </Col>
      <Col span={18}>
        { children }
      </Col>
    </Row>
  );
}

AnalytiPage.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps({ demo }) {
  return { demo }
}

export default  connect(mapStateToProps)(AnalytiPage);
