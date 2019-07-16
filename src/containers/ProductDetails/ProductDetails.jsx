import React, { Component } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import * as actions from "../../actions";
import { connect } from "react-redux";
import * as constants from "../../common/constants";
import "./ProductDetails.css";
import { numberFormat } from "../../common/numberFormat";

var mapStateToProps = state => {
  return {
    product: state.ProductsReducer.currentProduct,
    isAuthenticated: state.UserReducer.isAuthenticated,
    email: state.UserReducer.isAuthenticated
      ? state.UserReducer.loggedInUser.email
      : null,
    addSuccessMessage: state.ProductsReducer.addSuccessMessage
  };
};

var mapDispatchToProps = dispatch => {
  return {
    fetchProductDetails: id => {
      dispatch(
        actions.FetchProductDetails(constants.apiUrls.FetchProductDetails + id)
      );
    },
    addToCart: (isAuthenticated, email, data) => {
      dispatch(
        actions.AddToCart(
          isAuthenticated,
          email,
          data,
          constants.apiUrls.AddToCart
        )
      );
    },
    clearProductMessages: () => {
      dispatch(actions.ClearProductMessages());
    }
  };
};

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.match.params.id
    };
  }

  componentDidMount() {
    this.props.clearProductMessages();
    this.props.fetchProductDetails(this.state._id);
  }

  handleAddToCart = () => {
    this.props.addToCart(this.props.isAuthenticated, this.props.email, {
      _id: this.props.product._id,
      displayName: this.props.product.displayName,
      quantity: 1,
      price: this.props.product.price,
      deliveryCharges: this.props.product.deliveryCharges
    });
  };

  render() {
    return (
      <Container>
        <div>
          <Row style={{ marginTop: "50px" }}>
            <Col sm="6">
              <img
                alt="Product Image"
                width="500px"
                src={this.props.product.image}
              />
            </Col>
            <Col sm="6">
              <div className="ptitle">{this.props.product.displayName}</div>
              <div className="pdetails">
                {"Category: " + this.props.product.category}
              </div>
              <div className="pdetails font-weight-bold">
                {numberFormat(this.props.product.price)}
              </div>
              <div className="pdetails">
                {"Shipping charges: " +
                  numberFormat(this.props.product.deliveryCharges)}
              </div>
              <Row className="m-4" />
              <Row>
                <Col sm="3">
                  <Button onClick={this.handleAddToCart} variant="primary">
                    Add to Cart
                  </Button>{" "}
                </Col>
                <Col sm="4">
                  <Button variant="secondary">Add to Wish List</Button>
                </Col>
              </Row>
              <Row className="m-2" />
              <Row>
                <Col sm="12">
                  {this.props.addSuccessMessage !== "" ? (
                    <Alert variant="success">
                      {this.props.addSuccessMessage}
                    </Alert>
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
