import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

// stripe promise
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);

const Payment = () => {
    const location = useLocation();
    const { donationInfo } = location.state;
    console.log('Donation Info:==================', donationInfo);
    const amount = donationInfo.amount;
    // console.log("found amount: ", amount)

    return (
        <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <h1 className="mt-2 mb-2 text-[24px] text-[#292A35] font-semibold text-center">
                Pay Now
            </h1>
            <Elements stripe={stripePromise} >
                <CheckoutForm price={amount} donationInfo={donationInfo} />
            </Elements>
        </div>
    );
};

export default Payment;