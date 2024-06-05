import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cart from './Cart';
import PaymentForm from './PaymentForm';
import { TotalProvider } from '../context/TotalContext';

const CheckoutPage = () => {
  const [subtotal, setSubtotal] = useState(0);

  const updateSubtotal = (newSubtotal) => {
    setSubtotal(newSubtotal);
  };


  return (
    <TotalProvider>
        <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-4">
                <Header />
                 <Cart updateSubtotal={updateSubtotal} />
            </div>
            <div className="w-full lg:w-1/3 p-10">
                <PaymentForm subtotal={subtotal} />
             </div>
        </div>
    </TotalProvider>
  );
};

export default CheckoutPage;
