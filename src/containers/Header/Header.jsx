import React, { Component } from "react";
import { Navbar, Form, FormControl, Nav, NavDropdown } from "react-bootstrap";
import * as actions from "../../actions";
import { connect } from "react-redux";
import "./Header.css";
import { withRouter } from "react-router-dom";

var mapStateToProps = state => {
  return {
    name: state.UserReducer.loggedInUser.name,
    cartCount: state.ProductsReducer.cart.length
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actions.Logout());
    }
  };
};

class Header extends Component {
  handleUpdateProfile = () => {
    this.props.history.push("/updateprofile");
  };

  handleLogoClick = () => {
    this.props.history.push("/products");
  };

  handleLogin = () => {
    this.props.history.push("/login");
  };

  handleLogout = () => {
    this.props.onLogout();
    this.props.history.push("/products");
  };

  handleCart = () => {
    this.props.history.push("/cart");
  };

  handleAddress = () => {
    this.props.history.push("/address");
  };

  render() {
    return (
      <Navbar bg="primary" variant="dark" className="justify-content-between">
        <Navbar.Brand
          onClick={this.handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img
            alt="eKart"
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span>eKart</span>
        </Navbar.Brand>
        <Form inline className="search">
          <FormControl
            type="text"
            placeholder="Search for products"
            className="mr-sm-2 searchinput"
          />
        </Form>
        <Nav>
          {this.props.name === "" && (
            <Nav.Link onClick={this.handleLogin}>Login/Signup</Nav.Link>
          )}
          {this.props.name !== "" && (
            <React.Fragment>
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.handleUpdateProfile}>
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleAddress}>
                  Manage Addresses
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          )}
          <div className="cart" onClick={this.handleCart}>
            <label className="cartcount">{this.props.cartCount}</label>
          </div>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
