import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const Communes = ({ communes }) => {
  return (
    <div>
      <Select style={{ width: 120 }}>
        <Option key='select' value="">Select a commune</Option>
        {communes.map((commune) => (
          <Option key={commune.id} value={commune.id}>{commune.name}</Option>
        ))}
      </Select>
    </div>
  )
};

export default Communes