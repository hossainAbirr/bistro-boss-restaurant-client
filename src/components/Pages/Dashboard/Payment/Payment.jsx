
import SectionTitle from '../../../SharedComponents/SectionTitle';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import CheckOutFrom from './CheckOutFrom';

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
const Payment = () => {
    return (
        <div>
            <SectionTitle
            subHeading={'Please Pay To Eat'}
            heading={'Payment'}
            ></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom></CheckOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;