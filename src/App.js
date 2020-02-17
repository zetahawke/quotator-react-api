import React from 'react';
import './App.css';
import Header from './components/header';
import QuotationForm from './components/quotation_form';

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <QuotationForm></QuotationForm>
    </div>
  );
}

export default App;