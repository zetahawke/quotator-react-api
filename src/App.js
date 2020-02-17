import React from 'react';
import { Button, Col, Row } from 'antd';
import './App.css';
import Contacts from './components/contacts';

class App extends React.Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data) => {
        this.setState({ contacts: data })
      })
      .catch(console.log)
  }

  render() {
    // const colCount = 4;
    // const cols = [];
    // for (let i = 1; i <= colCount; i++) {
    //   cols.push(
    //     <Col key={i.toString()} span={24 / colCount}>
    //       <div>Column</div>
    //     </Col>,
    //   );
    // }
    return (
      <div className="App">
        <Row gutter={[16, 16]}>
          <Col key={'asd'} span={24 / colCount}>
            <div>Column</div>
          </Col>
          <Col key={'asd'} span={24 / colCount}>
            <div>Column</div>
          </Col>
          <Col key={'asd'} span={24 / colCount}>
            <div>Column</div>
          </Col>
          <Col key={'asd'} span={24 / colCount}>
            <div>Column</div>
          </Col>
        </Row>
        <Contacts contacts={this.state.contacts} />
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;