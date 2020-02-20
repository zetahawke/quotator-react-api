import React from 'react';
// import { Button, Form, Input } from 'antd';
import Communes from './communes';
import Prices from './prices';

const pricesTableProps = {
  scroll: { x: 490 },
  size: 'small',
  showHeader: true
}

const QuotationForm = ({ communes, handleSubmit }) => {
  return (
    <div>
      <form layout={'inline'} onSubmit={handleSubmit}>
        <label>{'Communes:'}</label>
        <Communes communes={communes} />

        <label>{'Height:'}</label>
        <input name={'height'} type={'text'} placeholder={'30'} />

        <label>{'Width:'}</label>
        <input name={'width'} type={'text'} placeholder={'30'} />

        <label>{'Length:'}</label>
        <input name={'length'} type={'text'} placeholder={'30'} />

        <label>{'Weight:'}</label>
        <input name={'weight'} type={'text'} placeholder={'1'} />

        <button type="submit">
          Quotate
        </button>
      </form>

      {this.props.results !== undefined ? (
        <Prices data={this.props.results.prices} pricesTableProps={pricesTableProps} />
      ) : null}
    </div>

  );
};

export default QuotationForm