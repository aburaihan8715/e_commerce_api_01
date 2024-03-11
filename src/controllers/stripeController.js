import Stripe from 'stripe';

// TODO: have to pass my stripe key
const stripe = new Stripe(process.env.STRIPE_KEY);

const createPayment = async (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

export { createPayment };
