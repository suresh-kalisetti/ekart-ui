import React, { Component } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as constants from "../../common/constants";

var mapStateToProps = state => {
  return {
    email: state.UserReducer.loggedInUser.email,
    loginFailMessage: state.UserReducer.loginFailMessage
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onLoginStart: () => {
      dispatch(actions.LoginStart());
    },
    handleLogin: data => {
      dispatch(actions.Login(constants.apiUrls.Login, data));
    }
  };
};

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    this.props.onLoginStart();
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value.toLowerCase() });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleLogin({
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    return (
      <Container>
        {this.props.email !== "" && <Redirect to="/products" />}
        <div className="loginForm p-4">
          <h4 className="formHeader">Login</h4>
          <Form
            className="p-4"
            onSubmit={this.handleSubmit}
            action="javascript:void(0)"
          >
            <Form.Group>
              <Form.Control
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                required
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                required
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <div>
            <Link to="/register">New to eKart? Create an account</Link>
          </div>
          <div className="p-2">
            {this.props.loginFailMessage !== "" ? (
              <Alert variant="danger">{this.props.loginFailMessage}</Alert>
            ) : null}
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
