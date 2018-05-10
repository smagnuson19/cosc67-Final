import React, { Component } from 'react';
// import Immutable from 'immutable';


class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      optionsSelected: [],
      menuItemInfo: [],
      quantity: [],
    };
    this.buttonClick = this.buttonClick.bind(this);
  }
  componentDidMount() {
    fetch('./src/data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.products[this.props.theID].options);
        this.setState({ menuItemInfo: json.products[this.props.theID].options });
      });
  }

  render() {
    if (this.state.menuItems.length === 0) {
      return (
        <div>
        Loading
        </div>
      );
    } else {
      return (
        <div className=" square-select" >

          <div className="option-1">
            <h2> {this.menuItemInfo[0].options[0].title}</h2>
            <div className="buttonGroup">
              <button name="button1" onClick={this.buttonClick}>
                {this.menuItemInfo[0].options[0].option1}
              </button>
              <button name="option2" onClick={this.buttonClick}>
                {this.menuItemInfo[0].options[0].option1}
              </button>
              <button name="option3" onClick={this.buttonClick}>
                {this.menuItemInfo[0].options[0].option1}
              </button>
              <button name="option4" onClick={this.buttonClick}>
                {this.menuItemInfo[0].options[0].option1}
              </button>
            </div>

          </div>
          <div className="option-2">
            <h2> Options: </h2>

          </div>
          <div className="option-3">
            <h2> Options: </h2>

          </div>
        </div>


      );
    }
  }
}
