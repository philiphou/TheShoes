import React, { useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('sorry, product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/singin?redirect=/shipping');
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={10}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((i) => (
                <ListGroupItem key={i._id}>
                  <Row className="align-items-center">
                    <Col md={5}>
                      <img
                        src={i.image}
                        alt={i.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${i.slug}`}>{i.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => updateCartHandler(i, i.quantity - 1)}
                        variant="light"
                        disabled={i.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{i.quantity}</span>{' '}
                      <Button
                        onClick={() => updateCartHandler(i, i.quantity + 1)}
                        variant="light"
                      >
                        <i
                          className="fas fa-plus-circle"
                          disabled={i.quantity === i.countInStock}
                        ></i>
                      </Button>
                    </Col>
                    <Col md={2}>${i.price}</Col>
                    <Col md={1}>
                      <Button
                        onClick={() => removeItemHandler(i)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h4>
                    Subtotal: $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h4>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-grid">
                    <Button
                      onClick={checkoutHandler}
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
