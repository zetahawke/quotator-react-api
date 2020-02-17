import React from 'react';
// import ReactDOM from 'react-dom';
import { Button, Form, Input, Icon } from 'antd';
import Communes from './communes';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class QuotationForm extends React.Component {
  state = {
    communes: []
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/communes')
      .then(res => res.json())
      .then((data) => {
        this.setState({ communes: data })
        // console.log(data)
      })
      .catch(console.log);

    // this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const communeIdError = isFieldTouched('communeId') && getFieldError('communeId');
    const heightError = isFieldTouched('height') && getFieldError('height');
    const widthError = isFieldTouched('width') && getFieldError('width');
    const lengthError = isFieldTouched('length') && getFieldError('length');
    const weightError = isFieldTouched('weight') && getFieldError('weight');

    return (
      <Form layout={'inline'} onSubmit={this.handleSubmit}>
        <Form.Item label={'Commune'} validateStatus={communeIdError ? 'error' : ''} help={communeIdError || ''}>
          {getFieldDecorator('communeId', {
            rules: [{ required: true, message: 'Please input the commune id!' }],
          })(
            <Communes communes={this.state.communes} />,
          )}
        </Form.Item>
        <Form.Item label={'Height'} validateStatus={heightError ? 'error' : ''} help={heightError || ''}>
          {getFieldDecorator('height', {
            rules: [{ required: true, message: 'Please input the height!' }],
          })(
            <Input
              prefix={<Icon type="height" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="30"
            />,
          )}
        </Form.Item>
        <Form.Item label={'Width'} validateStatus={widthError ? 'error' : ''} help={widthError || ''}>
          {getFieldDecorator('width', {
            rules: [{ required: true, message: 'Please input the width!' }],
          })(
            <Input
              prefix={<Icon type="width" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="30"
            />,
          )}
        </Form.Item>
        <Form.Item label={'Length'} validateStatus={lengthError ? 'error' : ''} help={lengthError || ''}>
          {getFieldDecorator('length', {
            rules: [{ required: true, message: 'Please input the length!' }],
          })(
            <Input
              prefix={<Icon type="length" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="30"
            />,
          )}
        </Form.Item>
        <Form.Item label={'weight'} validateStatus={weightError ? 'error' : ''} help={weightError || ''}>
          {getFieldDecorator('weight', {
            rules: [{ required: true, message: 'Please input the weight!' }],
          })(
            <Input
              prefix={<Icon type="weight" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="1"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Cotizar
        </Button>
        </Form.Item>
      </Form>
    );
  }
};

const WrappedQuotationForm = Form.create({ name: 'quotator' })(QuotationForm);

export default WrappedQuotationForm