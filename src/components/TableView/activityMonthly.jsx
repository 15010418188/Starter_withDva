import React, { Component, PropTypes } from 'react';
import { Table ,Tooltip  } from 'antd';

import styles from './table.less';

const ActivityMonthly = ( { monthly , treedata }) => {

  const { list , loading  } = monthly;

  const renderItem = (o, row, index) => {
    if(!o){
      return "暂无记录"
    }
    return o
  }
  const renderDate = (o, row, index) => {
    if(row.year && row.month){
      return `${row.year}-${row.month}`
    }
    return "记录异常"
  }


  const renderText = (o, row, index) => {
    const element = treedata.filter((item) => { return item.id === row.companyid } )[0];
    let name = (element && element.note) || "";
    let companyName = "";
    if (name.length > 15) {
      companyName = (
        <Tooltip placement="bottom" title={ name }>
          <span>{`${name.substr(0, 14)}...`}</span>
        </Tooltip>
        )
    } else {
      companyName = (<span>{ name }</span>)
    }
    return companyName
  }

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'companyid',
      key: 'companyid',
      render:renderText
    },
    {
      title: '报活时间',
      dataIndex: 'activity-date',
      key: 'activity-date',
      render:renderDate
    },
    {
      title: '本月报活',
      dataIndex: 'activity_sum',
      key: 'activity_sum',
      render:renderItem,
      sorter: (a, b) => a.activity_sum - b.activity_sum
    },
    {
      title: '日活均值',
      dataIndex: 'activity_avg',
      key: 'activity_avg',
      render:renderItem,
      sorter: (a, b) => a.activity_avg - b.activity_avg
    },
    {
      title: '本月安装量',
      dataIndex: 'install_sum',
      key: 'install_sum',
      render:renderItem,
      sorter: (a, b) => a.install_sum - b.install_sum
    }
  ];



  const tableProps = {
    loading,
    columns,
    dataSource : list
  }

  return (
    <div className={styles.monthly}>
      <Table className={styles.table} {...tableProps}/>
    </div>
  );
}

ActivityMonthly.propTypes = {
  monthly : PropTypes.object.isRequired
};


export default  ActivityMonthly;
