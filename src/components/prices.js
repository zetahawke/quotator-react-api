import React from 'react';

import { Table, Row, Col, Card } from 'antd';

const { Column } = Table;

const Prices = ({ data, pricesTableProps }) => {
  return (
    <Row gutter={24}>
      <Col>
        <Card title={'El precio que más se ajusta'}>
          <Row gutter={24}>
            <Table {...pricesTableProps} data={data}>
              <Column
                title='Courier'
                key='courier'
                dataIndex='courier'
                render={
                  value => {
                    return value.name
                  }
                }
              />
              <Column
                title='Dias'
                key='days'
                dataIndex='days'
                render={
                  value => {
                    return value
                  }
                }
              />
              <Column
                title='Precio'
                key='price'
                dataIndex='price'
                render={
                  value => {
                    return `$ ${value}`
                  }
                }
              />
              <Column
                title='Costo'
                key='cost'
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
