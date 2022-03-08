import React, { useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((i) => (
                <ListGroupItem key={i._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={i.image}
                        alt={i.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${i.slug}`}>{i.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={i.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{i.quantity}</span>{' '}
                      <Button variant="light">
                        <i
                          className="fas fa-plus-circle"
                          disabled={i.quantity === i.countInStock}
                        ></i>
                      </Button>
                    </Col>
                    <Col md={3}>${i.price}</Col>
                    <Col md={2}>
                      <i className="fas fa-trash"></i>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
