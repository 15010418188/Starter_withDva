import React, { Component, PropTypes } from 'react';
import { Button , Table ,Icon } from 'antd';
import { connect } from 'dva';

import CompanyTree from '../components/TreeView/CompanyTree'
import styles from './treeView.less';

  const TreeView = ({ dispatch , tree }) => {
  const onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    dispatch({ type : 'tree/setState' , payload :{ expandedKeys, autoExpandParent: false}})
  };


  const onSelect = (selectedKeys, info) => {
    dispatch({
      type : 'tree/selectNodeItem',
      payload : { selectedKeys }
    })
  };

  const treeProps = {
    data : tree.treedata,
    onExpand,
    onSelect,

    autoExpandParent:tree.autoExpandParent,
    expandedKeys:tree.expandedKeys,
    selectedKeys:tree.selectedKeys,
    defaultCheckedKeys:tree.defaultCheckedKeys
  }

  return (
    <div className={styles.tree}>
      <CompanyTree {...treeProps}/>
    </div>
  );
}

TreeView.propTypes = {

};

function mapStateToProps({ tree } ) {
  return  { tree }
}

export default  connect(mapStateToProps)(TreeView);
