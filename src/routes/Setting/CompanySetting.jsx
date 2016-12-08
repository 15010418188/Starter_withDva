import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import CompanyTable from '../../components/TableView/companyTable';
import CompanyModal from '../../components/CompanyManager/CompanyModal';

const CompanySetting = ( { dispatch , tree })  => {

  const onEdit = (record, event) => {
    dispatch({type:'tree/startEditItem', payload : record.id });
  }

  const handleCancel =() =>{
    dispatch({type:'tree/refreshTable'});
  }

  const handleOK =() =>{
    dispatch({type:'tree/update'});
  }

  const onFieldsChange = (fields) => {
    console.log("fields" , fields);
    dispatch({
      type: 'tree/updateCurrentItem',
      payload : fields
    });
  }

  const companyModalProps = {
     visible : tree.visible,
     currentItem : tree.currentItem,
     handleCancel,
     handleOK,
     onFieldsChange
  }
  const companyProps = {
    tree,
    onEdit
  }


  return (
    <div>
      <CompanyTable {...companyProps}/>
      <CompanyModal {...companyModalProps} />
    </div>
  );
}


CompanySetting.propTypes = {

};
function mapStateToProps({ tree }) {
  return { tree }
}

export default  connect(mapStateToProps)(CompanySetting);
