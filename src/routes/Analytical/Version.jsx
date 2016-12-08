import React, { Component, PropTypes } from 'react';
import { Tabs ,Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import moment from 'moment';
var _ = require('lodash');

import VersionTable from '../../components/TableView/version';
import ChartVersion from '../../components/Chart/chartVersion';
import SelectInfo from '../../components/Info/selectInfo'

const TabPane = Tabs.TabPane;
import styles from './analytic.less';

const Version  = ( { dispatch , version , tree , install}) => {

  const onVersionChange = (date, dateString) => {
    let dateQuery = undefined;
    if (date.length !== 0) {
      dateQuery = date
    }
    dispatch({type:'version/queryDateChange' , payload : { dateQuery } });
  }

  const onChangeTab = () => {
    console.log("change tab");
  }

  const installSum = _.sumBy(version.list,(item =>  { return item.install_sum }));
  const activitySum = _.sumBy(version.list,(item =>  { return item.activity_sum }));
  const installTotal = _.sumBy(install.list,(item =>  { return item.sum }));

  const selectInfo = {
    node : tree.selectItem,
    onDateChange : onVersionChange,
    dateQuery : version.dateQuery,
    dateType : 'monthly',
    installSum,
    activitySum,
    installTotal
  };

  const activityProps = {
    version,
    treedata : tree.treedata
  };
  const chartProps = {
    treedata : tree.treedata ,
    version
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
            <VersionTable {...activityProps} />
        </TabPane>

        <TabPane tab={<span><Icon type="linechart" />图表展示</span>} key="chart">
          <Tabs tabPosition={"right"}>
            <TabPane tab="安装版本统计" key="1">
              <ChartVersion type={"install"} {...chartProps} />
            </TabPane>
            <TabPane tab="报活版本统计" key="2">
              <ChartVersion type={"activity"} {...chartProps} />
            </TabPane>
          </Tabs>

        </TabPane>
      </Tabs>
    </div>
  );
}

Version.propTypes = {

};

function mapStateToProps({ version , tree ,install }) {
  return { version , tree ,install }
}

export default  connect(mapStateToProps)(Version);
