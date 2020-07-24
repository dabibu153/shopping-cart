import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckOut: false,
      name: "",
      email: "",
      address: "",
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartN,
    };
    this.props.processOrder(order);
  };
  render() {
    return (
      <div>
        {this.props.cartN.length === 0 ? (
          <div className="cart cart-header">Cart is Empty</div>
        ) : (
          <div className="cart cart-header">
            you have {this.props.cartN.length} item(s) in cart
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {this.props.cartN.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      ${item.price} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {this.props.cartN.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: ${" "}
                    {this.props.cartN
                      .reduce((a, c) => a + c.price * c.count, 0)
                      .toFixed(1)}
                  </div>
                </div>
                <button
                  onClick={() => {
                    this.setState({ showCheckOut: true });
                  }}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
              {this.state.showCheckOut && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <lable>Email: </lable>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <lable>Name: </lable>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <lable>Address: </lable>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
