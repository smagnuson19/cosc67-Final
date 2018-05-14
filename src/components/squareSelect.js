import React, { Component } from 'react';
// import Immutable from 'immutable';


class SquareSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity0: 0,
      quantity1: 0,
      quantity2: 0,
      quantity3: 0,
    };
    // title, itemPrice, optionsPrice, optionsList
    //
    // updatetotal, updateitems
    // this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(id) {
    let total = 0;
    // console.log(`THE TOTALLL${total}`);
    let item = {};
    switch (id) {
      case 'button0':

        this.setState({ quantity0: this.state.quantity0 + 1 }, () => {
          total = (this.props.optionsPrice);
          const json = { };
          json[`${this.props.optionsList[0]}`] = this.state.quantity0;
          item = Object.assign(json, item);
          this.props.updateTotal(total, item);
        });

        break;

      case 'button1':

        this.setState({ quantity1: this.state.quantity1 + 1 }, () => {
          total = (this.props.optionsPrice);
          const json = { };
          json[`${this.props.optionsList[1]}`] = this.state.quantity1;
          item = Object.assign(json, item);
          this.props.updateTotal(total, item);
        });

        break;

      case 'button2':
        this.setState({ quantity2: this.state.quantity2 + 1 }, () => {
          total = (this.props.optionsPrice);
          const json = { };
          json[`${this.props.optionsList[2]}`] = this.state.quantity2;
          item = Object.assign(json, item);
          this.props.updateTotal(total, item);
        });

        break;

      case 'button3':
        this.setState({ quantity3: this.state.quantity3 + 1 }, () => {
          total = (this.props.optionsPrice);
          const json = { };
          json[`${this.props.optionsList[3]}`] = this.state.quantity3;
          item = Object.assign(json, item);
          this.props.updateTotal(total, item);
        });

        break;

      default:
        break;
    }

    // this.setState({ optionSelected: item });
  }

  render() {
    if (this.props.optionsList.length === 0) {
      return (
        <div>
        Loading
        </div>
      );
    } else {
      return (
        <div className=" square-select" >
          <div className="option-1">
            <h3> {this.props.title}</h3>
            <div className="buttonGroup">
              <button name="button1" onClick={() => this.buttonClick('button0')}>
                {this.props.optionsList[0]}
                <p>Quantity: {this.state.quantity0} </p>
              </button>
              <button name="option2" onClick={() => this.buttonClick('button1')}>
                {this.props.optionsList[1]}
                <p>Quantity: {this.state.quantity1} </p>
              </button>
              <button name="option3" onClick={() => this.buttonClick('button2')}>
                {this.props.optionsList[2]}
                <p>Quantity: {this.state.quantity2} </p>
              </button>
              <button name="option4" onClick={() => this.buttonClick('button3')}>
                {this.props.optionsList[3]}
                <p>Quantity: {this.state.quantity3} </p>
              </button>
            </div>
          </div>
        </div>


      );
    }
  }
}

export default SquareSelect;
