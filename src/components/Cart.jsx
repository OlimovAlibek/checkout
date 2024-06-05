import React, { useState, useEffect } from 'react';
import ItemCart from './ItemCart';
import { getItemsFromCart, updateItemInCart, deleteItemFromCart, getShippingPrice } from '../utils/indexedDB';

const Cart = ({ updateSubtotal }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      const items = await getItemsFromCart();
      const shippingPrice = await getShippingPrice();
      setCartItems(items);
      setShipping(shippingPrice);
      calculateSubtotal(items);
    };

    fetchCartData();
  }, []);

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    updateSubtotal(total);
  };

  const updateItemQuantity = async (id, newQuantity) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);

    const itemToUpdate = updatedItems.find(item => item.id === id);
    await updateItemInCart(id, itemToUpdate);
  };

  const removeItem = async (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);

    await deleteItemFromCart(id);
  };

  return (
    <div className="p-2">
        <h2 className="text-2xl font-bold">Shopping cart</h2>
        <p className="text-gray-600">You have {cartItems.length} items in your cart</p>
        <div className="mt-4">
            {cartItems.map(item => (
                <ItemCart
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                    updateQuantity={updateItemQuantity}
                    removeItem={removeItem}
                />
            ))}
        </div>
    </div>
  );
};

export default Cart;
