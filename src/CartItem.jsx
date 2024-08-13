import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  console.log("cart Item", cart);
  const dispatch = useDispatch();

  const calculateTotalCost = () => {
    if (!Array.isArray(cart)) {
      console.error('Expected cart to be an array');
      return 0;
    }
    return cart.reduce((total, item) => {
      // Remove the dollar sign and convert cost to a number
      const cost = parseFloat(item.cost.replace(/[^0-9.-]/g, '')) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + (cost * quantity);
    }, 0).toFixed(2);
  };

  // Calculate total amount for all products in the cart
/*const calculateTotalCost = () => {
    if (!Array.isArray(cart)) {
      console.error('Expected cart to be an array');
      return 0;
    }
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };*/

  const totalCost = calculateTotalCost();


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Handle continuing shopping
  const handleContinueShopping = (e) => {
    if(e){
      e.preventDefault();
    }
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // Handle checkout functionality
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalCost}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${parseFloat(item.cost.replace(/[^0-9.-]/g, '')) * item.quantity}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
      <button className="get-started-button" onClick={() => handleContinueShopping()}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


