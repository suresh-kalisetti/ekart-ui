import React from "react";
import "./Address.css";

function Address(props) {
  return (
    <div className="address">
      <div className="addressHeader">{props.address.name}</div>
      <div>{props.address.address}</div>
      <div>{props.address.city + " " + props.address.pincode}</div>
      <div>{props.address.state}</div>
      <div>{"Mobile No: " + props.address.phoneNo}</div>
      <span className="addressAction" onClick={() => props.onEdit(props.index)}>
        Edit
      </span>
      &nbsp;&nbsp;
      <span
        className="addressAction"
        onClick={() => props.onDelete(props.address.id)}
      >
        Delete
      </span>
    </div>
  );
}

export default Address;
