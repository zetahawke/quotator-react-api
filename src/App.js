import React from 'react';
import './App.css';
import Header from './components/header';
import QuotationFormContainer from './components/quotation_form_container';
import QuotationForm from './components/quotation_form';

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <QuotationFormContainer>
        <QuotationForm />
      </QuotationFormContainer>
    </div>
  );
}

export default App;