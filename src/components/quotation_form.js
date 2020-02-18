import React from 'react';
// import { Button, Form, Input } from 'antd';
import Communes from './communes';

class QuotationForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    communes: [],
    couriers: [],
    results: []
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

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
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

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    console.log(fetchParams)
    debugger;

    fetch('http://localhost:3023/api/quotations', {
      method: 'POST',
      body: fetchParams,
      headers: headers
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
      <form layout={'inline'} onSubmit={this.handleSubmit}>
        <label>{'Communes:'}</label>
        <Communes communes={this.state.communes} />

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
    );
  }
};

export default QuotationForm