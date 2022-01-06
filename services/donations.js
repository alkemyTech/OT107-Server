const axios = require('axios');
require('dotenv').config();
const paypal = require('../modules/paypal');

const createOrder = async (params, res) => {
  try {
    const { data: { access_token } } = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
      params,
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.PAYPAL_API_CLIENT,
          password: process.env.PAYPAL_API_SECRET,
        },
      }
    );

    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      paypal.orderOptions,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
};

const captureOrder = async (req, res) => {
  await axios.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders/${req.query.token}/capture`,
    {},
    {
      auth: {
        username: process.env.PAYPAL_API_CLIENT,
        password: process.env.PAYPAL_API_SECRET,
      },
    }
  );
};

module.exports = {
  createOrder,
  captureOrder
};
