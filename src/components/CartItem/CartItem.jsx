import React from "react";
import "./CartItem.css";
import { numberFormat } from "../../common/numberFormat";
import { Row, Col, Button } from "react-bootstrap";

function CartItem(props) {
  return (
    <div className="cartview">
      <div className="cartHeader">{props.item.displayName}</div>
      <div className="font-weight-bold">{numberFormat(props.item.price)}</div>
      <div>
        {"Shipping charges: " + numberFormat(props.item.deliveryCharges)}
      </div>
      <Row className="m-2">
        <Col sm="3">
          <button
            onClick={() => props.onIncrement(props.item._id)}
            className="quantityAction"
          >
            +
          </button>
          <input
            disabled
            className="quantity"
            type="text"
            value={props.item.quantity}
          />
          <button
            onClick={() => props.onDecrement(props.item._id)}
            className="quantityAction"
          >
            -
          </button>
        </Col>
        <Col sm="3">
          <span
            className="cartAction"
            onClick={() => props.onRemove(props.item._id)}
          >
            Remove
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default CartItem;
