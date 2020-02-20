import React from 'react';

import { Table, Row, Col, Card } from 'antd';

const { Column } = Table;

const pricesTableProps = {
  scroll: { x: 490 },
  size: 'small',
  showHeader: true
}


const Prices = ({ data }) => {
  console.log(data);
  return (
    <Row gutter={24}>
      <Col>
        <Card title={'El precio que más se ajusta'}>
          <Row gutter={24}>
            <Table {...pricesTableProps} dataSource={data.prices}>
              <Column
                title='Courier'
                dataIndex='courier'
                render={
                  value => {
                    return value ? value.name : value;
                  }
                }
              />
              <Column
                title='Dias'
                dataIndex='days'
                render={
                  value => {
                    return value
                  }
                }
              />
              <Column
                title='Precio'
                dataIndex='price'
                render={
                  value => {
                    return `$ ${value}`
                  }
                }
              />
              <Column
                title='Costo'
                dataIndex='cost'
                render={
                  value => {
                    return `$ ${value}`
                  }
                }
              />
            </Table>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Prices;
