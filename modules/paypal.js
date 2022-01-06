const orderOptions = {
  intent: 'CAPTURE',
  purchase_units: [
    {
      amount: {
        currency_code: 'USD',
        value: '100.00',
      },
      description: 'Donation',
    },
  ],
  application_context: {
    brand_name: 'somosmas.com',
    landing_page: 'LOGIN',
    user_action: 'PAY_NOW',
    return_url: 'http://localhost:3000/donations/capture-order',
    cancel_url: 'http://localhost:3000/donations/cancel-order',
  }
};

module.exports = {
  orderOptions
};
