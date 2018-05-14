import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import '~slick-carousel/slick/slick.css';
// import '~slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
// import Immutable from 'immutable';
import MenuItem from './components/menuitem';


import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [],
      total: 0,
      itemsInCart: [],
      itemSelection: 0,
      modalIsOpen: false,
      modalPayIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    Modal.setAppElement('#main');
    this.updateTotal = this.updateTotal.bind(this);
    this.updateItemList = this.updateItemList.bind(this);
    this.renderCart = this.renderCart.bind(this);
    this.closePayModal = this.closePayModal.bind(this);
    this.openPayModal = this.openPayModal.bind(this);
    this.renderPayNowButton = this.renderPayNowButton.bind(this);
  }

  componentDidMount() {
    fetch('./src/data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
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


  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  closePayModal() {
    this.setState({ modalPayIsOpen: false });
  }
  openPayModal() {
    this.setState({ modalPayIsOpen: true });
  }

  updateTotal(totalPrice) {
    this.setState({ total: this.state.total + totalPrice });
  }

  clearCart() {
    const newList = [];
    this.setState({ itemsInCart: newList });
    this.setState({ total: 0 });
  }

  payNow(modalStyles) {
    return (
      <Modal
        isOpen={this.state.modalPayIsOpen}
          // onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closePayModal}
        overlayClassName="Overlay"
        className="Modal"
        style={modalStyles}
        contentLabel="Modal-Options"
      >
        <button onClick={this.closePayModal}>close</button>
        <div>
          {this.state.itemsInCart.map((cartItem, id) =>
        (
          <div className="cartItem" key={cartItem.id} >
            <button onClick={() => this.removeItem(cartItem.Id)}> Remove item </button>
            <p>{JSON.stringify(cartItem)} </p>
          </div>

        )) }
          <h2>SWIPE CARD ON THE LEFT</h2>

        </div>
      </Modal>
    );
  }

  removeItem(id) {
    console.log(id);
    for (let i = 0; i < this.state.itemsInCart.length;) {
      console.log(this.state.itemsInCart[i].Id);
      if (id === this.state.itemsInCart[i].Id) {
        const newList = [].concat(this.state.itemsInCart);
        newList.splice(i, 1);
        console.log(newList);
        this.setState({ itemsInCart: newList });
        const itemPrice = this.state.itemsInCart[id].price;
        this.updateTotal(-1 * (itemPrice));
        break;
      } else {
        i += 1;
      }
    }
  }

  updateItemList(itemList) {
    const newItemToAdd = JSON.parse(JSON.stringify(itemList));

    this.setState({ itemsInCart: [...this.state.itemsInCart, newItemToAdd] });
    console.log(this.state.itemsInCart);
    this.closeModal();
  }

  renderPayNowButton() {
    if (this.state.itemsInCart.length > 0) {
      return (
        <li><button onClick={() => this.openPayModal()}> Pay Now </button></li>
      );
    } else {
      return null;
    }
  }


  renderCart() {
    if (this.state.itemsInCart.length === 0) {
      return (
        <div className="no-cart-items">
          <h3> Items </h3>
          <p> No items in order. Add some by touching on the boxes below </p>
        </div>
      );
    } else {
      return (
        <div className="itemList">
          <h3> Items </h3>
          {console.log(this.state.itemsInCart)}
          {this.state.itemsInCart.map((cartItem, id) =>
          (
            <div className="cartItem" key={cartItem.id} >
              <button onClick={() => this.removeItem(cartItem.Id)}> Remove item </button>
              <p>{JSON.stringify(cartItem)} </p>
            </div>

          )) }
        </div>
      );
    }
  }

  render() {
    if (this.state.menuItems.length === 0) {
      return (
        <div>
        Loading
        </div>
      );
    } else {
      const modalStyles = {
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
      };

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
      };
      return (
        <div className="body-wrapper">
          <div className="itemListDisplay">
            {this.renderCart()}
            <div className="itemListInfo">
              <ul>

                <li> Total: {this.state.total}</li>
                <li><button onClick={() => this.clearCart()}> Clear Cart </button></li>
                {this.renderPayNowButton()}
              </ul>
            </div>
            {this.payNow(modalStyles)}
          </div>


          <div className="menuItem-wrapper">
            <div>
              {this.state.menuItems.length > 0 ?
                <Slider {...settings}>
                  {this.state.menuItems.map((product, index) =>
                (
                  <div data-index={product.id} key={product.id} role="button" tabIndex={0} className="menuItem-Wrapper" onClick={() => this.onSelectItemClick(product.id)}>
                    <ul>
                      <li><h3>{product.name}</h3></li>
                      <li><img src={product.picture_url} alt="" /></li>
                      <li>Descrip: {product.description}</li>
                      <li>Price: {product.price}</li>
                    </ul>
                  </div>
          ))}
                </Slider> : null}
            </div>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            overlayClassName="Overlay"
            className="Modal"
            style={modalStyles}
            contentLabel="Modal-Options"
          >
            <h2>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <div>

              <MenuItem
                theID={this.state.menuItems[this.state.itemSelection].id}
                theTitle={this.state.menuItems[this.state.itemSelection].title}
                updateTotal={this.updateTotal}
                updateItemList={this.updateItemList}
              />

            </div>
          </Modal>
        </div>
      );
    }
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
