import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as actions from "../../actions";
import { connect } from "react-redux";
import * as constants from "../../common/constants";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem";

var mapStateToProps = state => {
  return {
    cart: state.ProductsReducer.cart,
    email: state.UserReducer.isAuthenticated
      ? state.UserReducer.loggedInUser.email
      : null
  };
};

var mapDispatchToProps = dispatch => {
  return {
    fetchProductDetails: id => {
      dispatch(
        actions.FetchProductDetails(constants.apiUrls.FetchProductDetails + id)
      );
    },
    removeItem: data => {
      dispatch(actions.RemoveItem(constants.apiUrls.RemoveItem, data));
    }
  };
};

class Cart extends Component {
  onIncrement = _id => {};

  onDecrement = _id => {};

  onRemove = _id => {
    this.props.removeItem({
      email: this.props.email,
      _id: _id
    });
  };

  render() {
    return (
      <Container>
        <div className="cartForm p-4">
          <h5 className="formHeader">My Cart</h5>
          {this.props.cart.map(item => (
            <CartItem
              key={item._id}
              onIncrement={this.onIncrement}
              onDecrement={this.onDecrement}
              onRemove={this.onRemove}
              item={item}
            />
          ))}
        </div>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
