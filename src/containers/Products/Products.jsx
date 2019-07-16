import React, { Component } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import * as actions from "../../actions";
import { connect } from "react-redux";
import * as constants from "../../common/constants";
import "./Products.css";

var mapStateToProps = state => {
  return {
    products: state.ProductsReducer.products,
    cartSaved: state.ProductsReducer.cartSaved,
    cart: state.ProductsReducer.cartSaved ? null : state.ProductsReducer.cart,
    email: state.ProductsReducer.cartSaved
      ? null
      : state.UserReducer.loggedInUser.email
  };
};

var mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(actions.FetchProducts(constants.apiUrls.FetchProducts));
    },
    saveCart: data => {
      dispatch(actions.SaveCart(constants.apiUrls.SaveCart, data));
    }
  };
};

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    if (!this.props.cartSaved) {
      this.props.saveCart({ email: this.props.email, item: this.props.cart });
    }
  }

  handleClick = id => {
    this.props.history.push("/products/" + id);
  };

  render() {
    return (
      <Container>
        <div>
          <Row>
            {this.props.products.map(product => (
              <Col key={product._id} sm="3">
                <Card style={{ width: "15rem", marginTop: "15px" }}>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>
                      <span
                        onClick={() => this.handleClick(product._id)}
                        className="cardlink"
                      >
                        {product.displayName}
                      </span>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
