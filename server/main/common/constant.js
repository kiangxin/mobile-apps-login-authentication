module.exports = {
  //JWT constants
  JWT: {
    EXPIRE_TIME: 3600,
  },

  REQUEST_METHOD: {
    POST: 'POST',
    GET: 'GET',
  },

  D7_CONFIGURATIONS: {
    BASE_URL: 'https://d7networks.com',
    RAPID_TOKEN: 'b6fe34bc38517463764989fcb8b9c742888a6971',
    METHODS: {
      SEND: 'api/verifier/send',
      VERIFY: 'api/verifier/verify',
      RESEND: 'api/verifier/resend',
    },
    SENDER_ID: 'AUTH_4',
    EXPIRATION: '900',
  },

};
