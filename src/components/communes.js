import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const Communes = ({ communes }) => {
  return (
    <div>
      <select id={'communeId'} name={'communeId'} style={{ width: 120 }}>
        <option key='select' value="">Select a commune</option>
        {communes.map((commune) => (
          <option key={commune.id} value={commune.id + '-' + commune.name}>{commune.name}</option>
        ))}
      </select>
    </div>
  )
};

export default Communes