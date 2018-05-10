import React, { Component } from 'react';
// import Immutable from 'immutable';
// import squareSelect from './components/squareSelect';


class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      // optionsSelected: [],
      menuItemInfo: [],

    };
  }
  componentDidMount() {
    fetch('./src/data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.products);
        console.log(this.state.price);
        this.setState({ menuItemInfo: json.products[this.props.theID] });
        console.log(this.state.menuItemInfo);
      });
  }

  // checkOptionsLoading() {
  //   this.state.menuItemInfo.map((itemOption, id) => (
  //     if(itemOption.type
  //
  //
  //   )
  //
  // )
  // }

  render() {
    if (this.state.menuItemInfo.length === 0) {
      return (
        <div>
        Loading
        </div>
      );
    } else {
      console.log(this.state.menuItemInfo.options);

      return (
        <div className="menuItem-Wrapper" >
          <div className="header-area">
            <ul>
              <li> {this.state.menuItemInfo.title}
                Price: {this.state.menuItemInfo.price}
              </li>
              <li> Description: {this.state.menuItemInfo.description} </li>
            </ul>
            <img src={this.state.menuItemInfo.picture_url} alt="" />
          </div>
          <div className="menuOptions-area">
          options go here //pass in id
          </div>
        </div>
      );
    }
  }
}
export default MenuItem;
