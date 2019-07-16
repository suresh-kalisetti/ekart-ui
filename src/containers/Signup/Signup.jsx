import React, { Component } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Signup.css";
import * as constants from "../../common/constants";

var mapStateToProps = state => {
  return {
    signupCompleted: state.UserReducer.signupCompleted,
    signupFailMessage: state.UserReducer.signupFailMessage
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onCreateStart: () => {
      dispatch(actions.CreateStart());
    },
    register: (name, email, password) => {
      dispatch(
        actions.Register(constants.apiUrls.Register, { name, email, password })
      );
    }
  };
};

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: ""
  };

  componentDidMount() {
    this.props.onCreateStart();
  }

  handleSubmit = event => {
    let valid = true;
    var nameregex = /^[a-zA-Z ]*$/;
    var emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordregex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W)/;
    if (this.state.name === "") {
      this.setState({ nameError: "Please enter name" });
      valid = false;
    } else if (!nameregex.test(this.state.name)) {
      this.setState({ nameError: "Please enter valid name" });
      valid = false;
    }
    if (this.state.email === "") {
      this.setState({ emailError: "Please enter email" });
      valid = false;
    } else if (!emailregex.test(this.state.email.toLowerCase())) {
      this.setState({ emailError: "Please enter valid email" });
      valid = false;
    }
    if (this.state.password === "") {
      this.setState({ passwordError: "Please enter password" });
      valid = false;
    } else if (!passwordregex.test(this.state.password)) {
      this.setState({ passwordError: "Please enter valid password" });
      valid = false;
    }
    if (this.state.confirmPassword === "") {
      this.setState({ confirmPasswordError: "Please enter confirm password" });
      valid = false;
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Password and confirm password are not matching"
      });
      valid = false;
    }

    event.preventDefault();
    if (valid) {
      this.props.register(
        this.state.name,
        this.state.email,
        this.state.password
      );
    }
  };

  handleUpdateName = event => {
    this.setState({ name: event.target.value, nameError: "" });
  };

  handleUpdateEmail = event => {
    this.setState({ email: event.target.value.toLowerCase(), emailError: "" });
  };

  handleUpdatePassword = event => {
    this.setState({ password: event.target.value, passwordError: "" });
  };

  handleUpdateConfirmPassword = event => {
    this.setState({
      confirmPassword: event.target.value,
      confirmPasswordError: ""
    });
  };

  render() {
    return (
      <Container>
        <div className="signupForm p-4">
          <h4 className="formHeader">Signup</h4>
          <Form onSubmit={this.handleSubmit} className="p-4" noValidate>
            <Form.Group as={Row}>
              <Form.Label className="control-label" column sm="3">
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={this.state.email}
                  placeholder="Enter Email"
                  onChange={this.handleUpdateEmail}
                  className={this.state.emailError !== "" ? "errorControl" : ""}
                />
                <span className="errorLabel">{this.state.emailError}</span>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={this.state.name}
                  placeholder="Enter Your Name"
                  onChange={this.handleUpdateName}
                  className={this.state.nameError !== "" ? "errorControl" : ""}
                />
                <span className="errorLabel">{this.state.nameError}</span>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handleUpdatePassword}
                  className={
                    this.state.passwordError !== "" ? "errorControl" : ""
                  }
                />
                <div className="infoLabel">
                  one lower case, one upper case, one digit, and a special
                  character
                </div>
                <span className="errorLabel">{this.state.passwordError}</span>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Confirm Password
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  value={this.state.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleUpdateConfirmPassword}
                  className={
                    this.state.confirmPasswordError !== "" ? "errorControl" : ""
                  }
                />
                <span className="errorLabel">
                  {this.state.confirmPasswordError}
                </span>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 4, offset: 3 }}>
                <Button variant="primary" type="submit">
                  Create Account
                </Button>
              </Col>
            </Form.Group>
          </Form>
          <Row>
            <Col sm={{ span: 9, offset: 3 }}>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
          <div className="p-2">
            {this.props.signupCompleted ? (
              <Alert variant="success">Account created successfully!</Alert>
            ) : null}
            {this.props.signupFailMessage !== "" ? (
              <Alert variant="danger">{this.props.signupFailMessage}</Alert>
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
)(Signup);
