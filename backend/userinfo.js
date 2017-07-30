'use strict';
// TODO a util class is needed to hold a lot of the DRY

const AuthenticationClient = require('auth0').AuthenticationClient;
const ManagementClient = require('auth0').ManagementClient;

const throwErr = (err) => {
  throw new Error(err)
}

var tokenInfo = {
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

const getUser = (user_id, token) => {
  const auth0 = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    token: token
  });
  console.log(`Getting info for ${user_id}`)
  return auth0.getUser({id: user_id})
}

module.exports.get = (event, context, callback) => {
  const _getUser = getUser.bind(this, event.requestContext.authorizer.principalId)
  getToken()
    .then(_getUser)
    .then((user) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(user)
      };
      callback(null, response);
    })
    .catch(throwErr)
}

module.exports.post = (event, context, callback) => {
  if(!event.queryStringParameters.name) {
    throwErr('Missing name to activate.')
  }
  const newWorkout = event.queryStringParameters.name
  var token = undefined
  const _getUser = getUser.bind(this, event.requestContext.authorizer.principalId)

  getToken()
    .then((_token) => {token = _token; return token})
    .then(_getUser)
    .then((user) => {
      const auth0 = new ManagementClient({
        domain : process.env.AUTH0_DOMAIN,
        token: token
      });
      var active = user.user_metadata.active
      console.log(`${event.requestContext.authorizer.principalId}: Adding '${newWorkout}' to '${active}'`)
      active.push(newWorkout)
      return auth0.updateUserMetadata(
        {id: event.requestContext.authorizer.principalId},
        {active: active}
      )
    })
    .then((user) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(user)
      };
      callback(null, response);
    })
    .catch(throwErr)
}
