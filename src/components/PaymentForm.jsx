import React, { useState, useEffect } from 'react';
import mastercardImage from '../assets/images/mastercard.png';
import visaImage from '../assets/images/visa.png';
import rupayImage from '../assets/images/rupay.png';
import user from '../assets/images/ali.JPG';
import { getItemsFromCart, getShippingPrice, saveCardDetails } from '../utils/indexedDB';

const PaymentForm = ({ subtotal }) => {
  const [shipping, setShipping] = useState(0);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

  const [nameError, setNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [cardTypeError, setCardTypeError] = useState('');
  const [cardTypeMessage, setCardTypeMessage] = useState('');

  useEffect(() => {
    const fetchShippingPrice = async () => {
        const shippingPrice = await getShippingPrice();
        setShipping(shippingPrice);
    };

    fetchShippingPrice();
  }, []);

  const handleCheckout = async () => {
    if (validateForm()) {
        const cartItems = await getItemsFromCart();
        const shippingPrice = await getShippingPrice();
        const total = subtotal + shippingPrice;

        const cardDetails = {
            name,
            cardNumber,
            expirationDate,
            cvv,
            cardType
        };

        saveCardDetails(cardDetails);

        alert(`Succesfully added in indexedDB! You can check your information in application's database! Total: $${total} Thank you for your purchase)`);
    }
  };

    const validateForm = () => {
        let valid = true;
        if (name === '') {
            setNameError('Name on card is required.');
            valid = false;
        } 
        else {
            setNameError('');
        }

    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
        setCardNumberError('Card number must be 16 digits.');
        valid = false;
    } 
    else {
        setCardNumberError('');
    }

    const expirationDateRegex = /^\d{2}\/\d{2}$/;
    if (!expirationDateRegex.test(expirationDate)) {
        setExpirationDateError('Expiration date must be in the format mm/yy.');
        valid = false;
    } 
    else {
        setExpirationDateError('');
    }

    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
        setCvvError('CVV must be 3 digits.');
        valid = false;
    } 
    else {
        setCvvError('');
    }

    if (cardType === '') {
        setCardTypeError('Please select a card type.');
        valid = false;
    } 
    else {
         setCardTypeError('');
    }

    return valid;
  };

  const handleExpirationDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 2) {
            setExpirationDate(value);
        } 
        else if (value.length <= 4) {
            setExpirationDate(value.slice(0, 2) + '/' + value.slice(2));
        }
  };

  const handleSeeAll = () => {
        setCardTypeMessage('No more options available.');
  };

  const total = subtotal + shipping;

  return (
    <div className="p-4 bg-[#565ABB] text-white rounded-3xl shadow-md">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Card Details</h2>
            <img className="h-12 w-12 rounded-xl" src={user} alt="userPhoto" />
        </div>
        <div className="mt-4">
            <h2 className='mb-2'>Card Type</h2>
            <div className="flex items-center mb-2 justify-between">
                <img
                    src={mastercardImage}
                    alt="MasterCard"
                    className={`h-12 w-[75px] cursor-pointer ${cardType === 'MasterCard' ? 'border-2 border-white' : ''}`}
                    onClick={() => setCardType('MasterCard')}
                />
                <img
                    src={visaImage}
                    alt="Visa"
                    className={`h-12 w-[75px] cursor-pointer ${cardType === 'Visa' ? 'border-2 border-white' : ''}`}
                    onClick={() => setCardType('Visa')}
                />
                <img
                    src={rupayImage}
                    alt="RuPay"
                    className={`h-12 w-[75px] cursor-pointer ${cardType === 'RuPay' ? 'border-2 border-white' : ''}`}
                    onClick={() => setCardType('RuPay')}
                />
                <button className="text-white bg-[#6268C6] py-1 px-2 rounded-md h-12 w-[75px]" onClick={handleSeeAll}>See all</button>
            </div>
            {cardTypeMessage && <div className="text-white text-sm mt-1">{cardTypeMessage}</div>}
            {cardTypeError && <div className="text-red-500 text-sm mt-1">{cardTypeError}</div>}
            <div className="mt-4">
                <label className="block mb-2">Name on card</label>
                <input
                    type="text"
                    className="w-full p-2 bg-[#6268C6] text-white rounded-md"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError && <div className="text-red-500 text-sm mt-1">{nameError}</div>}
            </div>
            <div className="mt-4">
                <label className="block mb-2">Card Number</label>
                <input
                    type="text"
                    className="w-full p-2 bg-[#6268C6] text-white rounded-md"
                    placeholder="1111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
                {cardNumberError && <div className="text-red-500 text-sm mt-1">{cardNumberError}</div>}
            </div>
            <div className="mt-4 flex">
                <div className="mr-2 flex-1">
                    <label className="block mb-2">Expiration date</label>
                    <input
                    type="text"
                    className="w-full p-2 bg-[#6268C6] text-white rounded-md"
                    placeholder="mm/yy"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    maxLength="5"
                    />
                    {expirationDateError && <div className="text-red-500 text-sm mt-1">{expirationDateError}</div>}
                </div>
                <div className="ml-2 flex-1">
                    <label className="block mb-2">CVV</label>
                    <input
                    type="text"
                    className="w-full p-2 bg-[#6268C6] text-white rounded-md"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    />
                    {cvvError && <div className="text-red-500 text-sm mt-1">{cvvError}</div>}
                </div>
            </div>
        </div>
        <div className="mt-4">
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
                 <span>Shipping</span>
                <span>${shipping}</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
                <span>Total (Tax incl.)</span>
                <span>${total}</span>
            </div>
            <div
                className="w-full py-2 h-14 bg-[#4DE1C1] text-white rounded-md flex items-center justify-between px-4 cursor-pointer"
                onClick={handleCheckout}
            >
            <span>${total.toLocaleString()}</span>
            <span className="flex items-center">
                Checkout 
                <span className="ml-2">→</span>
            </span>
         </div>
        </div>
    </div>
  );
};

export default PaymentForm;
