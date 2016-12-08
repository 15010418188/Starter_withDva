import React, { Component, PropTypes } from 'react';
import { Tabs ,Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import moment from 'moment';
var _ = require('lodash');

import ActivityMonthly from '../../components/TableView/activityMonthly';
import ChartMonthly from '../../components/Chart/chartMonthly';

import SelectInfo from '../../components/Info/selectInfo'

const TabPane = Tabs.TabPane;
import styles from './analytic.less';

const Monthly  = ( { dispatch , monthly , tree , install}) => {


  const onMonthlyChange = (date, dateString) => {
    let dateQuery = undefined;
    if (date.length !== 0) {
      dateQuery = date
    }
    dispatch({type:'monthly/queryDateChange' , payload : { dateQuery } });
  }

  const onChangeTab = () => {
    console.log("change tab");
  }

  const installSum = _.sumBy(monthly.list,(item =>  { return item.install_sum }));
  const activitySum = _.sumBy(monthly.list,(item =>  { return item.activity_sum }));
  const installTotal = _.sumBy(install.list,(item =>  { return item.sum }));
  const selectInfo = {
    node : tree.selectItem,
    onDateChange : onMonthlyChange,
    dateQuery : monthly.dateQuery,
    dateType : 'monthly',
    installSum,
    activitySum,
    installTotal
  };
  const activityProps = {
    monthly,
    treedata : tree.treedata
  };
  const chartProps = {
    treedata : tree.treedata ,
    monthly
  };

  const tabsProps = {
    defaultActiveKey:"table",
    onChange : onChangeTab
  };

  return (
    <div className={styles.monthly}>
      <SelectInfo {...selectInfo} className={styles.info}/>
      <Tabs {...tabsProps}>
        <TabPane tab={<span><Icon type="solution" />明细展示</span>} key="table">
            <ActivityMonthly {...activityProps} />
        </TabPane>

        <TabPane tab={<span><Icon type="linechart" />图表展示</span>} key="chart">
            <ChartMonthly {...chartProps} />
        </TabPane>
      </Tabs>
    </div>
  );
}

Monthly.propTypes = {

};

function mapStateToProps({ monthly , tree ,install }) {
  return { monthly , tree ,install }
}

export default  connect(mapStateToProps)(Monthly);
