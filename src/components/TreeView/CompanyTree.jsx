import React, {Component, PropTypes} from 'react';
import {Tree} from 'antd';
import styles from './treeView.less';

const TreeNode = Tree.TreeNode;

const CompanyTree = ( {
onSelect,
selectedKeys,
data  } ) => {

  const TreeProps = {
    onSelect,
    autoExpandParent : true,
    selectedKeys,
  }



  const generateData = ( _data ,  _parentId) => {
    const parentId = _parentId || 0;
    return _data.filter((search) => { return search.parent === parentId} ).map((node) => {
      const nodeItem = {
          title: node.note,
          key: node.id
      }
      if(_data.filter((search) => { return search.parent === node.id}) .length !== 0 ){
        return { ...nodeItem , children: generateData(_data,node.id) }
      }
      return nodeItem;
    })
  }



  const gData = generateData(data);

  const loop = (data) => data.map((item) => {
    const key = item.key.toString();
    if (item.children) {
      return (
        <TreeNode key={ key } title={item.title} >
          { loop(item.children) }
        </TreeNode>
      );
    }
    return <TreeNode key={ key } title={item.title}/>;
  });

  return (
    <Tree {...TreeProps} >
      { loop(gData) }
    </Tree>
  );
};

CompanyTree.propTypes = {};

export default CompanyTree;
