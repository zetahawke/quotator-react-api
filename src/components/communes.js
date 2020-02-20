import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const Communes = ({ communes }) => {
  console.log(communes);
  return (
    <div>
      <select id={'communeId'} name={'communeId'} style={{ width: 120 }}>
        <option key='select' value="">Select a commune</option>
        {
          communes.constructor === Array ?
            communes.map((commune) => (
              <option key={commune.id} value={commune.id + '-' + commune.name}>{commune.name}</option>
            )) : null
        }
      </select>
    </div>
  )
};

export default Communes