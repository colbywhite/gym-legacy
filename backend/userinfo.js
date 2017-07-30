'use strict';

const AuthenticationClient = require('auth0').AuthenticationClient;
const ManagementClient = require('auth0').ManagementClient;

const throwErr = (err) => {
  throw new Error(err)
}

let tokenInfo = {
  dateRetrieved: undefined,
  token: undefined
}

const getToken = () => {
  const yesterday = new Date()
  yesterday.setHours(yesterday.getHours() - 23)
  if(tokenInfo.token && tokenInfo.dateRetrieved > yesterday) {
    return Promise.resolve(tokenInfo.token)
  }
  console.log('Getting new token')
  var authClient = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_BACKEND_CLIENT_ID,
    clientSecret: process.env.AUTH0_BACKEND_CLIENT_SECRET
  });
  return authClient.clientCredentialsGrant({audience: 'https://gym-legacy.auth0.com/api/v2/', scope: 'read:users'})
    .then((response) => {
      tokenInfo.token = response.access_token
      tokenInfo.dateRetrieved = new Date()
      return response.access_token
    })
}

module.exports.get = (event, context, callback) => {
  getToken()
    .then((token) => {
      const auth0 = new ManagementClient({
        domain : process.env.AUTH0_DOMAIN,
        token: token
      });
      console.log(`Getting info for ${event.requestContext.authorizer.principalId}`)
      return auth0.getUser({id: event.requestContext.authorizer.principalId})
    })
    .then((user) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(user)
      };
      callback(null, response);
    })
    .catch(throwErr)
};
