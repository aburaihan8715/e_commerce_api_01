/*
import Stripe from 'stripe';
import { stripeSecretKey } from '../config/index.js';

// TODO: have to pass my stripe key
const stripe = new Stripe(stripeSecretKey);

const createPayment = async (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        next(stripeErr);
      } else {
        res.status(200).json({
          status: 'success',
          data: stripeRes,
        });
      }
    }
  );
};

export { createPayment };
*/
