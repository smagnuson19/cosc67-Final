import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import Immutable from 'immutable';
import MenuItem from './components/menuitem';

import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [],
      // Total
      // itemsInCart: [],
      itemSelection: 0,
      modalIsOpen: false,
    };
    // this.updateMenuItem = this.newNote.bind(this);
    // this.deleteNote = this.deleteNote.bind(this);
    // this.editNote = this.editNote.bind(this);
    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    Modal.setAppElement('#main');
  }

  componentDidMount() {
    fetch('./src/data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.products);
        this.setState({ menuItems: json.products });
      });
  }

  onSelectItemClick(id) {
    this.setState({ itemSelection: id });
    this.setState({ modalIsOpen: true });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    console.log(this.state.menuItems[this.state.itemSelection].options);
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  // //  this.subtitle.style.color = '#f00';
  // }


  closeModal() {
    this.setState({ modalIsOpen: false });
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
        <div className="body-wrapper">
          <div className="itemListDisplay">
            <div className="itemList">
              An Item
            </div>
            <div className="itemListInfo">
              <ul>
                <li> Total: </li>
                <li> Pay Now: </li>
              </ul>
            </div>
          </div>


          <div className="menuItemDisplay">
            {this.state.menuItems.map((product, id) =>
          (
            <div key={product.id} role="button" tabIndex={0} className="menuItem-Wrapper" onClick={() => this.onSelectItemClick(product.id)}>
              <ul>
                <li><h3>{product.name}</h3></li>
                <li><img src={product.picture_url} alt="" /></li>
                <li>Descrip: {product.description}</li>
                <li>Price: {product.price}</li>
              </ul>
            </div>
          ))}
          </div>
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            overlayClassName="Overlay"
            className="Modal"
            contentLabel="Modal-Options"
          >
            <h2>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <div>
              <MenuItem
                theID={this.state.menuItems[this.state.itemSelection].id}
              />
            </div>
          </Modal>
        </div>
      );
    }
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
