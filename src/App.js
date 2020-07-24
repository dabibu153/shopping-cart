import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/products.js";
import Filter from "./components/filter.js";
import Cart from "./components/cart";
// new feature added
// feature in dev
class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "all",
      sort: "latest",
    };
  }

  processOrder = (order) => {
    alert("place order for " + order.name);
  };

  removeFromCart = (item) => {
    const cartItems1 = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems1.filter((x) => x._id !== item._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems1.filter((x) => x._id !== item._id))
    );
  };

  setcart = (event) => {
    const cartItems1 = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems1.forEach((item) => {
      if (item._id === event._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems1.push({ ...event, count: 1 });
    }
    this.setState({ cartItems: cartItems1 });
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };

  setsize = (event) => {
    if (event.target.value === "all") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    }
    if (event.target.value === "XS") {
      this.setState({
        size: event.target.value,
        products: data.products.filter((oneProduct) =>
          oneProduct.availableSizes.includes(event.target.value)
        ),
      });
    }
    if (event.target.value === "S") {
      this.setState({
        size: event.target.value,
        products: data.products.filter((oneProduct) =>
          oneProduct.availableSizes.includes(event.target.value)
        ),
      });
    }
    if (event.target.value === "M") {
      this.setState({
        size: event.target.value,
        products: data.products.filter((oneProduct) =>
          oneProduct.availableSizes.includes(event.target.value)
        ),
      });
    }
    if (event.target.value === "L") {
      this.setState({
        size: event.target.value,
        products: data.products.filter((oneProduct) =>
          oneProduct.availableSizes.includes(event.target.value)
        ),
      });
    }
    if (event.target.value === "XL") {
      this.setState({
        size: event.target.value,
        products: data.products.filter((oneProduct) =>
          oneProduct.availableSizes.includes(event.target.value)
        ),
      });
    }
    if (event.target.value === "XXL") {
      this.setState({
        size: event.target.value,
        products: data.products.filter((oneProduct) =>
          oneProduct.availableSizes.includes(event.target.value)
        ),
      });
    }
  };

  setsort = (event) => {
    if (event.target.value === "latest") {
      this.setState({
        sort: event.target.value,
        products: this.state.products.sort((a, b) => a._id - b._id),
      });
    }
    if (event.target.value === "lowest") {
      this.setState({
        sort: event.target.value,
        products: this.state.products.sort((a, b) => a.price - b.price),
      });
    }
    if (event.target.value === "highest") {
      this.setState({
        sort: event.target.value,
        products: this.state.products.sort((a, b) => b.price - a.price),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shoping Site</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                setsize={this.setsize}
                setsort={this.setsort}
              ></Filter>
              <Products products={this.state.products} setCart={this.setcart} />
            </div>
            <div className="sidebar">
              <Cart
                cartN={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                processOrder={this.processOrder}
              />
            </div>
          </div>
        </main>
        <footer>all rights reserved</footer>
      </div>
    );
  }
}

export default App;
