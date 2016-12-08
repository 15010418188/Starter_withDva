import React, { Component, PropTypes } from 'react';
import { Tabs ,Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import ActivityDaily from '../../components/TableView/activityDaily';
import ChartDaily from '../../components/Chart/chartDaily';
import SelectInfo from '../../components/Info/selectInfo'

const TabPane = Tabs.TabPane;
import styles from './analytic.less';

const Daily  = ( { dispatch , daily , tree , install }) => {

  const onDailyChange = (date, dateString) => {
    dispatch({type:'daily/queryDateChange' , payload : { dateQuery : date } });
  }

  const installSum = _.sumBy(daily.list,(item =>  { return item.install_sum }));
  const activitySum = _.sumBy(daily.list,(item =>  { return item.activity_sum }));
  const installTotal = _.sumBy(install.list,(item =>  { return item.sum }));

  const selectInfo = {
    node : tree.selectItem,
    onDateChange : onDailyChange,
    dateQuery : daily.dateQuery,
    dateType : 'daily',
    installSum,
    activitySum,
    installTotal
  };

  const activityDailyProps = {
    daily,
    treedata : tree.treedata
  };
  const chartDailyProps = {
    daily,
    treedata : tree.treedata
  };

  const onChangeTab = () => {
    console.log("change tab");
  }

  const tabsProps = {
    defaultActiveKey:"table",
    onChange : onChangeTab
  };

  return (
    <div className={styles.monthly}>
      <SelectInfo {...selectInfo} className={styles.info}/>
      <Tabs {...tabsProps}>
          <TabPane tab={<span><Icon type="solution" />明细展示</span>} key="table">
              <ActivityDaily {...activityDailyProps} />
          </TabPane>
          <TabPane tab={<span><Icon type="linechart" />图表展示</span>} key="chart">
              <ChartDaily {...chartDailyProps} />
          </TabPane>
      </Tabs>
    </div>
  );
}

Daily.propTypes = {

};

function mapStateToProps({ daily , tree ,install}) {
  return { daily , tree ,install }
}

export default  connect(mapStateToProps)(Daily);
