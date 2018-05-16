import React, { Component } from 'react';
// import Immutable from 'immutable';
import Dropdown from './dropdown';
import SquareSelect from './squareSelect';


class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      optionsSelected: {
        Item: this.props.theTitle,
        Id: this.props.theID,
      },
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
        this.setState({ menuItemInfo: json.products[this.props.theID] });
        this.setState({ price: json.products[this.props.theID].price });
        // console.log(this.state.menuItemInfo);
      });
  }
  updateTotal(value, item) {
    this.setState({ price: this.state.price + value }, () => {
      this.updateItems(item);
    });
  }

  updateItems(item) {
    const newItem = Object.assign(this.state.optionsSelected, item, { price: this.state.price });
    this.setState({ optionsSelected: newItem });
    console.log(`OPTIONS SELECTED in update ${JSON.stringify(this.state.optionsSelected)}`);
  }

  itemAddedToCart() {
    this.props.updateTotal(this.state.price);
    this.props.updateItemList(this.state.optionsSelected);
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
        <div className="menuItem-Modal" >
          <div className="header-area">
            <ul className="top-modal">
              <li> <h2> {this.state.menuItemInfo.title} </h2></li>
              <li><h2> Price: {this.state.price}</h2> </li>
            </ul>
            <li> Description: {this.state.menuItemInfo.description} </li>
            <img src={this.state.menuItemInfo.picture_url} alt="" />
          </div>
          <div className="menuOptions-area">
            {this.state.menuItemInfo.options.map((itemOption, id) => (
              this.renderOptions(itemOption)
              ))}
          </div>
          <button id="add-order" onClick={() => this.itemAddedToCart()}>Add To Order</button>
        </div>
      );
    }
  }
}
export default MenuItem;
