import React, { Component, PropTypes } from 'react';
import { Tabs } from 'antd';

import styles from './table.less';
import SelectInfo from '../Info/selectInfo';
import ChartDaily from '../Chart/chartDaily';
import ActivityDaily from '../TableView/activityDaily';

const TabPane = Tabs.TabPane;

const panelDaily = ( props ) => {
  const selectInfo = {

  };
  const activityDailyProps = {

  };
  const chartDailyProps = {

  };

  const onChangeTab = () =>{
    console.log("change tab");
  }
  const tabsProps = {
    defaultActiveKey:"table",
    onChange : onChangeTab
  };

  return (
    <div className={styles.monthly}>
      <SelectInfo {...selectInfo} className={styles.info}/>
      <Tabs {...selectInfo}>
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

panelDaily.propTypes = {

};


export default  panelDaily;
