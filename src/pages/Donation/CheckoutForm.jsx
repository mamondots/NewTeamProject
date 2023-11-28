import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const CheckoutForm = ({ price, donationInfo }) => {
    // console.log("found price:", price)
    // required hooks 
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState();
    const [processing, setProcessing] = useState(false);  
    const [transactionId, setTransactionId] = useState('');
    
    useEffect(() => {
        if (price > 0) {
            // console.log("isPrice:", price)
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])    



    // when user hits pay now button 
    const handleSubmit = async (event) => {
        // prevent from submission
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        console.log('card:', card);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email || 'anonymous',
                        name: user.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log("payment intent:", paymentIntent);
        setProcessing(false);


        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            // TODO: next steps
            const payment = {
                email: user?.email,
                name: user?.name,  
                location: user?.address,
                price,
                transactionId: paymentIntent.id,
                donationId: donationInfo.id,
                donationFor: donationInfo.donationFor,
                date: new Date(),

            }
       

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        //  display confirm
                        Swal.fire({
                            title: 'Success!',
                            text: `Payment $ ${price} has been successful. Your Transaction ID is: ${paymentIntent.id}`,
                            icon: 'success',
                            confirmButtonText: 'ok'
                        })

                    }
                })
        }
    }
    return (
        <div className="border w-3/5 bg-red-50 pt-8 mx-auto">
            {cardError && <p className="text-rose-600 px-5 pb-3">{cardError}</p>}
            <form className="flex flex-col gap-4 px-5  pb-10" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                
                <button className="btn  w-3/12 btn-sm py-2 mb-6 bg-black text-white hover:bg-[#994a47] text-xs px-[30px] rounded-[30px] " type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;