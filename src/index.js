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
      // Total
      // itemsInCart: [],
      itemSelection: 0,
      modalIsOpen: false,
    };

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
            <div className="itemList">
              An item in your cart goes here
            </div>
            <div className="itemListInfo">
              <ul>
                <li> Total: </li>
                <li> Pay Now: </li>
              </ul>
            </div>
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
              />
            </div>
          </Modal>
        </div>
      );
    }
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
