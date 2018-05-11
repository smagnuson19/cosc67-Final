import React, { Component } from 'react';
// import Immutable from 'immutable';
import Dropdown from './dropdown';
import SquareSelect from './squareSelect';


class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      optionsSelected: {},
      menuItemInfo: [],

    };
    this.renderOptions = this.renderOptions.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }
  componentDidMount() {
    fetch('./src/data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.products);
        this.setState({ menuItemInfo: json.products[this.props.theID] });
        this.setState({ price: json.products[this.props.theID].price });
        // console.log(this.state.menuItemInfo);
      });
  }
  updateTotal(value) {
    this.setState({ price: this.state.price + value });
  }

  updateItems(item, quantity) {
    const newItem = Object.assign(this.state.optionsSelected, item);
    this.setState({ optionsSelected: newItem });
    console.log(`OPTIONS SELECTED in update ${JSON.stringify(this.state.optionsSelected)}`);
  }


  renderOptions(itemOption) {
    if (itemOption.type === 'square-select') {
      return (
        <div className="optionWrapper">
          <SquareSelect
            title={itemOption.title}
            itemPrice={this.state.menuItemInfo.price}
            currentPrice={this.state.price}
            optionsPrice={itemOption.price}
            optionsList={itemOption.optionsList}
            updateTotal={this.updateTotal}
            updateItems={this.updateItems}
          />
        </div>
      );
    } else if (itemOption.type === 'dropdown') {
      const stringItem = JSON.stringify(itemOption.optionsList);
      return (
        <div className="optionWrapper">
          <Dropdown
            title={itemOption.title}
            theID={this.props.theID}
            optionsPrice={itemOption.price}
            updateTotal={this.updateTotal}
            updateItems={this.updateItems}
            optionsListString={stringItem}
          />
        </div>
      );
    } else if (itemOption.type === 'select-box') {
      return (
        <div className="optionWrapper">
      selectbox item w list
        </div>
      );
    } else {
      return (
        <p> No items to show </p>
      );
    }
  }

  render() {
    if (this.state.menuItemInfo.length === 0) {
      return (
        <div>
        Loading
        </div>
      );
    } else {
      // console.log(this.state.menuItemInfo.options);

      return (
        <div className="menuItem-Wrapper" >
          <div className="header-area">
            <ul>
              <li> {this.state.menuItemInfo.title}
                Price: {this.state.price}
              </li>
              <li> Description: {this.state.menuItemInfo.description} </li>
            </ul>
            <img src={this.state.menuItemInfo.picture_url} alt="" />
          </div>
          <div className="menuOptions-area">
            {this.state.menuItemInfo.options.map((itemOption, id) => (
              this.renderOptions(itemOption)
              ))}
          </div>
        </div>
      );
    }
  }
}
export default MenuItem;
