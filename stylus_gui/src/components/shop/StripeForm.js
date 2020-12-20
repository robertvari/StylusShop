import React,{useContext, useState} from 'react';
import axios from "axios"
import {UserContext} from "../contexts/UserContext";
import {ShoppingCartContext} from "../contexts/ShoppingCart";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import PulseLoader from 'react-spinners/PulseLoader'
import {useHistory} from 'react-router-dom'

const StripeForm = () => {
  const API_URL = process.env.REACT_APP_API_URL
  const {first_name, last_name, email, phone, zipcode, city, address} = useContext(UserContext)
  const {shopping_list, set_shopping_list, total} = useContext(ShoppingCartContext)
  const [waiting, set_waiting] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory()

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    set_waiting(true)

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      set_waiting(false)
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: first_name + " " + last_name,
        email: email,
        phone: phone,
        address: {
          city: city,
          country: "HU",
          postal_code: zipcode,
          line1: address
        }
      }
    });

    if (error) {
      set_waiting(false)
      console.log('[error]', error);
    } else {
      // send order with payment ID to API
      const {id} = paymentMethod

      const res = await axios({
        method: "post",
        url: `${API_URL}shop/order/`,
        data: {
          payment_id: id,
          amount: total * 100,
          shopping_list: shopping_list,

          customer: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            city: city,
            zipcode: zipcode,
            address: address
          }
        }
      })

      if(res.data.status === 'succeeded'){
        set_waiting(false)
        set_shopping_list([])
        localStorage.setItem('shopping_list', JSON.stringify([]))
        history.push('/payment_success')
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-card-form">
      <CardElement
          options={{
            hidePostalCode: true
          }}
      />
      {
        waiting?
            <PulseLoader
              size={16}
              color={'#81d463'}
            />
            :
            <button type="submit" disabled={!stripe} className="pay-button">
              Fizetés
            </button>
      }
    </form>
  );
};

export default StripeForm