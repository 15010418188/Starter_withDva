import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create({
  onFieldsChange(props, fields) {
    props.onFieldsChange(fields);
  },
  mapPropsToFields(props) {
    return { "currentItem" : props.currentItem };
  },
})(
  ({ visible, onCancel, onOK, form  , currentItem } ) => {

    const { getFieldDecorator } = form;
    const { note , name } = currentItem;
    console.log(note , name);
    const formItemLayout = {
      labelCol: { span:6 },
      wrapperCol: { span: 18 },
    };

    return (
      <Modal
        visible={ visible }
        title="编辑企业信息"
        okText="更新"
        onCancel={onCancel}
        onOk={ onOK }
      >
        <Form horizontal>

          <FormItem
            {...formItemLayout}
              label={<span>
              企业名称&nbsp;
            </span>}
          >
          {getFieldDecorator('note', {
            initialValue : note
          })(
            <Input />
          )}
          </FormItem>

          <FormItem
            {...formItemLayout}
              label={<span>
              企业标示&nbsp;
            </span>}
          >
          {getFieldDecorator('name', {
            initialValue : name
          })(
            <Input />
          )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
);

const CompanyModal = ({ visible, onFieldsChange, currentItem , handleCancel, handleOK}) => {
  const collectionProps = {
    visible,
    onCancel : handleCancel,
    onOK : handleOK,
    currentItem,
    onFieldsChange
  }
  return (
    <div>
      <CollectionCreateForm  {...collectionProps} />
    </div>
  );
}

CompanyModal.propTypes = {};

export default CompanyModal;
