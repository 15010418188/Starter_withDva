import React, { Component, PropTypes } from 'react';
import { Button , Table ,Icon } from 'antd';
import { connect } from 'dva';
import styles from './demo.less';

function Demo( { dispatch , demo }) {
  const { list , loading  } = demo;

  const onRemoveSn = ( row ) => {
    dispatch({type : 'demo/removeDemo' , payload : {id : row.id}})
  }
  const renderButton = (text , row , index )=>{
    return (<Button type="primary" size="small" icon="delete" onClick={onRemoveSn.bind(this,row)} >删除</Button>)
  }
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },{
    title:'操作',
    dateIndex:'option',
    key:'option',
    render:renderButton
  }
];

  const TableProps = {
    dataSource : list ,
    columns,
    loading
  }
  const handleClick = () => {
    dispatch({type:'demo/stopRequest'});
  }

  const ButtonProps ={
    onClick: handleClick
  }

  return (
    <div className={styles.normal}>
      <Button {...ButtonProps} />
      <Table {...TableProps} />
    </div>
  );
}

Demo.propTypes = {

};

function mapStateToProps({ demo }) {
  return { demo }
}

export default  connect(mapStateToProps)(Demo);
