import React, { Component } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as constants from "../../common/constants";
import "./ManageAddresses.css";
import Address from "../../components/Address/Address";

var mapStateToProps = state => {
  return {
    isAuthenticated: state.UserReducer.isAuthenticated,
    email: state.UserReducer.loggedInUser.email,
    addresses: state.UserReducer.loggedInUser.addresses
  };
};

var mapDispatchToProps = dispatch => {
  return {
    updateAddress: data => {
      dispatch(
        actions.UpdateAddress(constants.apiUrls.UpdateAddress, {
          data
        })
      );
    },
    deleteAddress: data => {
      dispatch(actions.DeleteAddress(constants.apiUrls.DeleteAddress, data));
    }
  };
};

class ManageAddresses extends Component {
  state = {
    id: 0,
    editmode: false,
    name: "",
    nameError: "",
    phoneNo: "",
    phoneNoError: "",
    address: "",
    addressError: "",
    city: "",
    cityError: "",
    pincode: "",
    pincodeError: "",
    state: "Select",
    stateError: ""
  };

  handleUpdateName = event => {
    this.setState({ name: event.target.value, nameError: "" });
  };

  handleUpdatePhoneNo = event => {
    let val = event.target.value;
    if (!isNaN(val) && val.length <= 10) {
      this.setState({ phoneNo: val, phoneNoError: "" });
    }
  };

  handleUpdateCity = event => {
    this.setState({ city: event.target.value, cityError: "" });
  };

  handleUpdatePincode = event => {
    let val = event.target.value;
    if (!isNaN(val) && val.length <= 6) {
      this.setState({ pincode: val, pincodeError: "" });
    }
  };

  handleUpdateAddress = event => {
    this.setState({ address: event.target.value, addressError: "" });
  };

  handleUpdateState = event => {
    this.setState({ state: event.target.value, stateError: "" });
  };

  handleSubmit = event => {
    let valid = true;
    var nameregex = /^[a-zA-Z ]*$/;
    if (this.state.name === "") {
      this.setState({ nameError: "Please enter name" });
      valid = false;
    } else if (!nameregex.test(this.state.name)) {
      this.setState({ nameError: "Please enter valid name" });
      valid = false;
    }

    if (this.state.phoneNo === "") {
      this.setState({ phoneNoError: "Please enter mobile number" });
      valid = false;
    } else if (this.state.phoneNo.length !== 10) {
      this.setState({ phoneNoError: "Please enter valid mobile number" });
      valid = false;
    }

    if (this.state.address === "") {
      this.setState({ addressError: "Please enter address" });
      valid = false;
    }

    if (this.state.city === "") {
      this.setState({ cityError: "Please enter city" });
      valid = false;
    } else if (!nameregex.test(this.state.city)) {
      this.setState({ cityError: "Please enter valid city" });
      valid = false;
    }

    if (this.state.pincode === "") {
      this.setState({ pincodeError: "Please enter pincode" });
      valid = false;
    } else if (this.state.pincode.length !== 6) {
      this.setState({ pincodeError: "Please enter valid pincode" });
      valid = false;
    }

    if (this.state.state === "Select") {
      this.setState({ stateError: "Please select state" });
      valid = false;
    }

    event.preventDefault();
    if (valid) {
      this.props.updateAddress({
        email: this.props.email,
        address: {
          id: this.state.id,
          name: this.state.name,
          phoneNo: this.state.phoneNo,
          address: this.state.address,
          city: this.state.city,
          pincode: this.state.pincode,
          state: this.state.state
        }
      });
      this.setState({ editmode: false });
    }
  };

  handleAddAddress = () => {
    this.setState({
      editmode: true,
      id: 0,
      name: "",
      phoneNo: "",
      address: "",
      city: "",
      state: "Select",
      pincode: ""
    });
  };

  handleCancel = () => {
    this.setState({ editmode: false });
  };

  handleEdit = index => {
    this.setState({
      editmode: true,
      id: this.props.addresses[index].id,
      name: this.props.addresses[index].name,
      phoneNo: this.props.addresses[index].phoneNo,
      address: this.props.addresses[index].address,
      city: this.props.addresses[index].city,
      state: this.props.addresses[index].state,
      pincode: this.props.addresses[index].pincode
    });
  };

  handleDelete = id => {
    this.props.deleteAddress({ email: this.props.email, id: id });
  };

  render() {
    return (
      <Container>
        {!this.props.isAuthenticated ? <Redirect to="/login" /> : null}
        <div className="addressForm p-4">
          <h5 className="formHeader">Manage Addresses</h5>
          <div onClick={this.handleAddAddress} className="addAddress">
            + Add A New Address
          </div>
          <div style={this.state.editmode ? { display: "none" } : {}}>
            {this.props.addresses.map((address, index) => (
              <Address
                key={address.id}
                index={index}
                address={address}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
              />
            ))}
          </div>
          <div style={this.state.editmode ? {} : { display: "none" }}>
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
                    className={
                      this.state.nameError !== "" ? "errorControl" : ""
                    }
                  />
                  <span className="errorLabel">{this.state.nameError}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Phone No
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    value={this.state.phoneNo}
                    placeholder="10 digit mobile number"
                    onChange={this.handleUpdatePhoneNo}
                    className={
                      this.state.phoneNoError !== "" ? "errorControl" : ""
                    }
                  />
                  <span className="errorLabel">{this.state.phoneNoError}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={this.state.address}
                    placeholder="Address (Door No, Street, Area)"
                    onChange={this.handleUpdateAddress}
                    className={
                      this.state.addressError !== "" ? "errorControl" : ""
                    }
                  />
                  <span className="errorLabel">{this.state.addressError}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  City
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    value={this.state.city}
                    placeholder="City"
                    onChange={this.handleUpdateCity}
                    className={
                      this.state.cityError !== "" ? "errorControl" : ""
                    }
                  />
                  <span className="errorLabel">{this.state.cityError}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Pincode
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    value={this.state.pincode}
                    placeholder="6 digit pincode"
                    onChange={this.handleUpdatePincode}
                    className={
                      this.state.pincodeError !== "" ? "errorControl" : ""
                    }
                  />
                  <span className="errorLabel">{this.state.pincodeError}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  State
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="select"
                    value={this.state.state}
                    onChange={this.handleUpdateState}
                    className={
                      this.state.stateError !== "" ? "errorControl" : ""
                    }
                  >
                    <option>Select</option>
                    <option>Andhra Pradesh</option>
                    <option>Arunachal Pradesh</option>
                    <option>Assam</option>
                    <option>Bihar</option>
                    <option>Chhattisgarh</option>
                    <option>Goa</option>
                    <option>Gujarat</option>
                    <option>Haryana</option>
                    <option>Himachal Pradesh</option>
                    <option>Jammu and Kashmir</option>
                    <option>Jharkhand</option>
                    <option>Karnataka</option>
                    <option>Kerala</option>
                    <option>Madhya Pradesh</option>
                    <option>Maharashtra</option>
                    <option>Manipur</option>
                    <option>Meghalaya</option>
                    <option>Mizoram</option>
                    <option>Nagaland</option>
                    <option>Odisha</option>
                    <option>Punjab</option>
                    <option>Rajasthan</option>
                    <option>Sikkim</option>
                    <option>Tamil Nadu</option>
                    <option>Telangana</option>
                    <option>Tripura</option>
                    <option>Uttar Pradesh</option>
                    <option>Uttarakhand</option>
                    <option>West Bengal</option>
                  </Form.Control>
                  <span className="errorLabel">{this.state.stateError}</span>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 2, offset: 3 }}>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Col>
                <Col sm={{ span: 4 }}>
                  <Button variant="secondary" onClick={this.handleCancel}>
                    Cancel
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAddresses);
