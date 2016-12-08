import React, { Component, PropTypes } from 'react';
import { DatePicker,Row,Col  } from 'antd';

import CardItem from './CardItem';
const { RangePicker , MonthPicker } = DatePicker;
import styles from './info.less';

const SelectInfo = ({ node , onDateChange , dateQuery , dateType , activitySum , installSum ,installTotal}) => {

  const monthlyPicker = {
    onChange:onDateChange,
    defaultValue : dateQuery,
    placeholder : "请选择报活月份"
  }
  let activityTitle,installTitle;

  if(dateType === 'daily'){
    activityTitle = "区间报活累计（次）";
    installTitle = "区间安装累计（次）";
  } else {
    activityTitle = "本月报活（自然月去重）";
    installTitle = "本月安装（自然月去重）";
  }
  const rangePicker = {
    onChange:onDateChange,
    defaultValue : dateQuery
  }


  const { note } = node;

  const activity = {
    titleIcon: 'share-alt',
    title: activityTitle,
    number: activitySum
  }

  const install = {
    titleIcon: 'cloud-download-o',
    title: installTitle,
    number: installSum
  }

  const total = {
    titleIcon: 'desktop',
    title: '安装总量',
    number: installTotal
  }

  const dateControl = () => {
    if(dateType === 'daily'){
      return (
        <div>报活月份:&nbsp;&nbsp;
          <RangePicker { ...rangePicker }/>
        </div>
      )
    } else if (dateType === 'monthly'){
      return (
        <div>报活月份:&nbsp;&nbsp;
          <MonthPicker { ...monthlyPicker }/>
        </div>
      )
    }
  };

  return (
    <div>
      <Row gutter={40}>
        <Col span={8}>
          <h1 className={styles.title}> { note } </h1>
          { dateControl() }
        </Col>
        <Col span={16}>
          <Row gutter={40}>
            <Col span={8}>
              <CardItem UIModel={activity}/>
            </Col>
            <Col span={8}>
              <CardItem UIModel={install}/>
            </Col>
            <Col span={8}>
              <CardItem UIModel={total}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

 SelectInfo.propTypes = {
   node : PropTypes.object.isRequired,
   onDateChange : PropTypes.func.isRequired
};

export default SelectInfo;
