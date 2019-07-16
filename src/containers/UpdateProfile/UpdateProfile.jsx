import React, { Component } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import * as actions from "../../actions";
import { connect } from "react-redux";
import "./UpdateProfile.css";
import * as constants from "../../common/constants";
import { Redirect } from "react-router-dom";

var mapStateToProps = state => {
  return {
    isAuthenticated: state.UserReducer.isAuthenticated,
    name: state.UserReducer.loggedInUser.name,
    email: state.UserReducer.loggedInUser.email,
    updateCompleted: state.UserReducer.updateCompleted
  };
};

var mapDispatchToProps = dispatch => {
  return {
    updateprofile: data => {
      dispatch(actions.UpdateProfile(constants.apiUrls.UpdateProfile, data));
    },
    clearUpdateFlags: data => {
      dispatch(actions.ClearUpdateFlags());
    }
  };
};

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      password: "",
      confirmPassword: "",
      nameError: "",
      passwordError: "",
      confirmPasswordError: "",
      updatePassword: false
    };
  }

  componentDidMount() {
    this.props.clearUpdateFlags();
  }

  handleSubmit = event => {
    let valid = true;
    var nameregex = /^[a-zA-Z ]*$/;
    var passwordregex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W)/;
    if (this.state.name === "") {
      this.setState({ nameError: "Please enter name" });
      valid = false;
    } else if (!nameregex.test(this.state.name)) {
      this.setState({ nameError: "Please enter valid name" });
      valid = false;
    }
    if (this.state.updatePassword) {
      if (this.state.password === "") {
        this.setState({ passwordError: "Please enter password" });
        valid = false;
      } else if (!passwordregex.test(this.state.password)) {
        this.setState({ passwordError: "Please enter valid password" });
        valid = false;
      }
      if (this.state.confirmPassword === "") {
        this.setState({
          confirmPasswordError: "Please enter confirm password"
        });
        valid = false;
      } else if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password and confirm password are not matching"
        });
        valid = false;
      }
    }

    event.preventDefault();
    if (valid) {
      var data = {
        name: this.state.name,
        email: this.state.email
      };
      if (this.state.updatePassword) {
        data.password = this.state.password;
      }
      this.props.updateprofile(data);
    }
  };

  handleUpdateName = event => {
    this.setState({ name: event.target.value, nameError: "" });
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

  handleCheckboxChange = event => {
    var password = event.target.checked ? this.state.password : "";
    var confirmPassword = event.target.checked
      ? this.state.confirmPassword
      : "";
    var passwordError = event.target.checked ? this.state.passwordError : "";
    var confirmPasswordError = event.target.checked
      ? this.state.confirmPasswordError
      : "";
    this.setState({
      updatePassword: event.target.checked,
      password: password,
      confirmPassword: confirmPassword,
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError
    });
  };

  render() {
    return (
      <Container>
        {!this.props.isAuthenticated ? <Redirect to="/login" /> : null}
        <div className="updateForm p-4">
          <h4 className="formHeader">Update profile details</h4>
          <Form onSubmit={this.handleSubmit} className="p-4" noValidate>
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
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Update Password"
                checked={this.state.updatePassword}
                onChange={this.handleCheckboxChange}
              />
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
                  disabled={!this.state.updatePassword}
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
                  disabled={!this.state.updatePassword}
                />
                <span className="errorLabel">
                  {this.state.confirmPasswordError}
                </span>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 4, offset: 3 }}>
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Col>
            </Form.Group>
          </Form>
          <div className="p-2">
            {this.props.updateCompleted ? (
              <Alert variant="success">Profile updated successfully!</Alert>
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
)(UpdateProfile);
