import React from 'react';
// import { Button, Form, Input } from 'antd';
import QuotationForm from './quotation_form'

const pricesTableProps = {
  scroll: { x: 490 },
  size: 'small',
  showHeader: true
}

class QuotationFormContainer extends React.Component {
  state = {
    communes: [],
    couriers: [],
    results: {}
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/communes')
      .then(res => res.json())
      .then((data) => {
        this.setState({ communes: data })
      })
      .catch(console.log);
    fetch('http://localhost:3023/api/couriers')
      .then(res => res.json())
      .then((data) => {
        this.setState({ couriers: data.couriers })
      })
      .catch(console.log);
  }
  1
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const obj = {};
    for (const [key, value] of data.entries()) {
      obj[key] = value;
    };

    const communeId = obj.communeId.split('-')[0];
    const communeName = obj.communeId.split('-')[1];
    const origins = () => {
      let posibleOrigins = {};
      this.state.couriers.forEach(courier => {
        posibleOrigins[courier.name.toLowerCase()] = 'LAS CONDES';
      });
      return posibleOrigins;
    };
    const destinies = () => {
      let posibleDestinies = {};
      this.state.couriers.forEach(courier => {
        posibleDestinies[courier.name.toLowerCase()] = communeName;
      });
      return posibleDestinies;
    };


    const fetchParams = {
      couriers_availables_from: origins(),
      couriers_availables_to: destinies(),
      height: obj.height,
      length: obj.length,
      width: obj.width,
      weight: obj.weight,
      is_payable: false,
      destiny: 'domicilio',
      courier_branch_office_id: null,
      courier_for_client: null,
      courier_selected: false,
      commune_id: communeId,
      algorithm: 1,
      algorithm_days: ""
    }

    fetch('http://localhost:3023/api/quotations', {
      method: 'POST',
      body: JSON.stringify(fetchParams),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ results: data })
        console.log(data);
      })
      .catch(console.log);
  };

  render() {
    return (
      <QuotationForm communes={this.state.communes} handleSubmit={this.handleSubmit}></QuotationForm>
    );
  }
};

export default QuotationFormContainer