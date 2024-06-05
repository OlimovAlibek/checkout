import React from 'react';
import PropTypes from 'prop-types';

import removeIconPath from "../assets/images/Trash.svg";

const ItemCart = ({ id, name, description, price, image, quantity, updateQuantity, removeItem }) => (
    
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-2xl mb-4">
        <img src={image} alt={name} className="h-16 w-16 rounded-md" />
        <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
        <div className='gap-5 flex items-center'>
            <div className="flex items-center">
                <span className="mx-2 min-w-[20px] text-center">{quantity}</span>
                <div className='flex flex-col gap-1'>
                    <button className="" onClick={() => updateQuantity(id, quantity + 1)}>
                        <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 8.57143L10 0L0 8.57143H20Z" fill="#393939"/>
                        </svg>
                    </button>
                    <button className="" onClick={() => updateQuantity(id, Math.max(0, quantity - 1))}>
                        <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 0.428572L10 9L0 0.428572H20Z" fill="#393939"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='flex items-center'>
                <span className="ml-4">${(price * quantity).toFixed(2)}</span>
                <button className="p-1" onClick={() => removeItem(id)}>
                    <img src={removeIconPath} alt="remove" />
                </button>
            </div>
        </div>
    </div>
);

ItemCart.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default ItemCart;


