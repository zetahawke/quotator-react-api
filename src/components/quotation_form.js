import React, { useEffect, useState } from 'react';
import Communes from './communes';
import Prices from './prices';

const QuotationForm = props => {
  const [quotationResults, setQuotationResults] = useState({});

  const handleSubmit = event => {
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
      props.couriers.forEach(courier => {
        posibleOrigins[courier.name.toLowerCase()] = 'LAS CONDES';
      });
      return posibleOrigins;
    };
    const destinies = () => {
      let posibleDestinies = {};
      props.couriers.forEach(courier => {
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

    fetchQuotationResults(fetchParams);
  };

  const fetchQuotationResults = async (fetchParams) => {
    fetch('http://localhost:3023/api/quotations', {
      method: 'POST',
      body: JSON.stringify(fetchParams),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        setQuotationResults(data)
      })
      .catch(console.log);
  };

  useEffect(() => {
  }, [
    quotationResults
  ]);

  return (
    <div>
      <form layout={'inline'} onSubmit={handleSubmit}>
        <label>{'Communes:'}</label>
        <Communes communes={props.communes} />

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

      {quotationResults ? (
        <Prices data={quotationResults} />
      ) : null}
    </div>

  );
};

export default QuotationForm