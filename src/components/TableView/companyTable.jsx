import React, { Component, PropTypes } from 'react';
import { Table ,Tooltip  ,Button } from 'antd';

import styles from './table.less';

const CompanyTable = ( {  tree , onEdit }) => {

  const { treedata , loading  } = tree;

  const renderText = (o, row, index) => {
    let name = row.note ;
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

  const renderParent = (o , row , index ) => {
    const element = treedata.filter((item) => { return item.id === row.parent } )[0];
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

  const renderAction = (o, row, index) => {
    return (
      <div>
        <Button type="primary" icon='edit' onClick={onEdit.bind(this, row)}></Button>
      </div>
    );
  };

  const columns = [
    {
      title: '企业ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '企业标示',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '企业名称',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: '上级企业名称',
      dataIndex: 'parent',
      key: 'parent',
      render:renderParent
    },
    {
      title:'操作',
      dataIndex:'option',
      key:'option',
      render : renderAction
    }
  ];



  const tableProps = {
    loading,
    columns,
    dataSource : treedata
  }

  return (
    <div className={styles.monthly}>
      <Table className={styles.table} {...tableProps}/>
    </div>
  );
}

CompanyTable.propTypes = {
  tree : PropTypes.object.isRequired
};

export default  CompanyTable;
