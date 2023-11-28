import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import { Link } from 'react-router-dom';
import donationCartoon from '../../assets/donation-cartoon.png'

// stripe promise
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);


const Donation = () => {

    return (
        <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-2 items-center">
            <div>
                <img src={donationCartoon} alt="donation-cartoon" className='max-w-[500px] mx-auto'/>
            </div>
            <div>
            <h1 className="mt-2 mb-2 text-3xl text-[#292A35] font-semibold text-center">
                Make your donation
            </h1>
            <p className='text-center'>Even the smallest donation does matter to us !</p>
            <div className='text-center mt-5 grid grid-cols-2 md:grid-cols-4 justify-center gap-3 max-w-[500px] mx-auto'>
                <Link to="/payment" state={{ donationInfo: {id: 1, amount: 5, donationFor: 'Food'} }}><button className="text-xl font-semibold px-6 py-4 bg-green-500 text-white hover:bg-[#272633] duration-300 cursor-pointer rounded-full w-full">$5 </button></Link>
                <Link to="/payment" state={{ donationInfo: {id: 2, amount: 10, donationFor: 'Shelter'}  }}><button className="text-xl font-semibold px-6 py-4 bg-green-500 text-white hover:bg-[#272633] duration-300 cursor-pointer rounded-full w-full">$10 </button></Link>
                <Link to="/payment" state={{ donationInfo: {id: 3, amount: 20, donationFor: 'Wellbeing'} }}><button className="text-xl font-semibold px-6 py-4 bg-green-500 text-white hover:bg-[#272633] duration-300 cursor-pointer rounded-full w-full">$50 </button></Link>
                <Link to="/payment" state={{ donationInfo: {id: 4, amount: 50, donationFor: 'Medication'} }}><button className="text-xl font-semibold px-6 py-4 bg-green-500 text-white hover:bg-[#272633] duration-300 cursor-pointer rounded-full w-full">$100 </button></Link>

            </div>
            </div>
        </div>
    );
};

export default Donation;