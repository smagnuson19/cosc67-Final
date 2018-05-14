import React, { Component } from 'react';
import Select from 'react-select';

// import Immutable from 'immutable';


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsSelected: [],
    };
    this.selectedItems = this.selectedItems.bind(this);
  }


  selectedItems(event) {
    const options = [];
    for (let i = 0; i < event.length;) {
      options.push(event[i].value);
      i += 1;
    }
    this.setState({ itemsSelected: options }, () => {
      const json = { };
      json[`${this.props.title}`] = this.state.itemsSelected;
      this.props.updateTotal(this.props.optionsPrice, json);
    });


    console.log(this.state.menuItemInfo);
    console.log(`${this.state.itemsSelected} do something state`);
  }

  render() {
    if (this.props.optionsListString.length === 0) {
      return (
        <div>
        Loading
        </div>
      );
    } else {
      const optionsListJson = JSON.parse(this.props.optionsListString);
      return (
        <div className="dropDown" >
          <h3> {this.props.title} </h3>
          <Select
            isMulti
            name={this.props.title}
            options={optionsListJson}
            className="basic-multi-select"
            onChange={this.selectedItems}
          />
        </div>
      );
    }
  }
}
export default Dropdown;
