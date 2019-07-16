import React from "react";
import Header from "../../containers/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../../containers/Login/Login";
import Signup from "../../containers/Signup/Signup";
import Products from "../../containers/Products/Products";
import UpdateProfile from "../../containers/UpdateProfile/UpdateProfile";
import ManageAddresses from "../../containers/ManageAddresses/ManageAddresses";
import ProductDetails from "../../containers/ProductDetails/ProductDetails";
import Cart from "../../containers/Cart/Cart";

function Layout() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Route path="/" exact component={Products} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
        <Route path="/products" exact component={Products} />
        <Route path="/updateprofile" exact component={UpdateProfile} />
        <Route path="/address" exact component={ManageAddresses} />
        <Route path="/products/:id" exact component={ProductDetails} />
        <Route path="/cart" exact component={Cart} />
      </Router>
    </React.Fragment>
  );
}

export default Layout;
