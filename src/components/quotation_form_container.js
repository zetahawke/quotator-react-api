import React from 'react';

class QuotationFormContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      communes: {
        loaded: false,
        data: []
      },
      couriers: {
        loaded: false,
        data: []
      }
    };
    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    const fetchCommunes = async () => {
      fetch('http://localhost:5000/api/communes')
        .then(res => res.json())
        .then((data) => {
          this.setState({ communes: { loaded: true, data: data } });
        })
        .catch(console.log);
    };

    const fetchCouriers = async () => {
      fetch('http://localhost:3023/api/couriers')
        .then(res => res.json())
        .then((data) => {
          this.setState({ couriers: { loaded: true, data: data.couriers } });
        })
        .catch(console.log);
    };
    fetchCommunes();
    fetchCouriers();
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => (
      React.cloneElement(child, {
        communes: this.state.communes.data,
        couriers: this.state.couriers.data
      })
    ))
  }

  render() {
    if (this.state.communes.loaded && this.state.couriers.loaded) {
      return <div>{this.renderChildren()}</div>;
    } else {
      return <h1>Loading...</h1>;
    }
  }
};

export default QuotationFormContainer