'use strict';

var Promise = require('bluebird');
Promise.longStackTraces();

var AuthenticationClient = require('auth0').AuthenticationClient;

if (typeof process.env.AUTH0_DOMAIN === "undefined" || ! process.env.AUTH0_DOMAIN.match(/\.auth0\.com$/)) {
  throw new Error("Expected AUTHO_DOMAIN environment variable to be set in .env file. See https://manage.auth0.com/#/applications")
}

if (typeof process.env.AUTH0_BACKEND_CLIENT_ID === "undefined" || process.env.AUTH0_BACKEND_CLIENT_ID.length === 0) {
  throw new Error("Expected AUTH0_BACKEND_CLIENT_ID environment variable to be set in .env file. See https://manage.auth0.com/#/applications")
}

var auth0 = new AuthenticationClient({
  domain : process.env.AUTH0_DOMAIN,
  clientId : process.env.AUTH0_BACKEND_CLIENT_ID
});

// extract and return the Bearer Token from the Lambda event parameters
var getToken = function(params) {
  var token;

  if (!params.type || params.type !== 'TOKEN') {
    throw new Error("Expected 'event.type' parameter to have value TOKEN");
  }

  var tokenString = params.authorizationToken;
  if (!tokenString) {
    throw new Error("Expected 'event.authorizationToken' parameter to be set");
  }

  var match = tokenString.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new Error("Invalid Authorization token - '" + tokenString + "' does not match 'Bearer .*'");
  }
  return match[1];
}

var returnAuth0UserInfo = function(auth0return) {
  if (! auth0return) throw new Error('Auth0 empty return');
  if (auth0return === 'Unauthorized') {
    throw new Error('Auth0 reports Unauthorized')
  }
  return JSON.parse(auth0return)
}

// extract user_id from the autho0 userInfo and return it for AWS principalId
var getPrincipalId = function(userInfo) {
    if (! userInfo || ! userInfo.sub) {
        throw new Error("No user_id returned from Auth0");
    }
    console.log('Auth0 authentication successful for user_id', userInfo.sub);
    return userInfo.sub
}

// return the expected Custom Authorizer JSON object
var getPolicy = function(policy, user_id) {
  return {
    principalId : user_id,
    policyDocument : policy
  }
}

const buildPolicy = (methodArn) => {
  const resource = resourceFromMethodArn(methodArn)
  return {
    Version: "2012-10-17",
    Statement: [{
      Sid: "Stmt1459758003000",
      Effect: "Allow",
      Action: [ "execute-api:Invoke" ],
      Resource: [resource]
    }]
  }
}

const resourceFromMethodArn = (arn) => {
  var arnParts = arn.split(':')
  const path = arnParts.splice(arnParts.length-1)[0]  // remove the old path
  const pathParts = path.split('/')
  let newPathParts = []
  newPathParts.push(pathParts[0])  // keep the same api id
  newPathParts.push(pathParts[1])  // keep the same stage
  newPathParts.push('*')  // accept a HTTP methods
  newPathParts.push('user')  // accept everything on the /user path
  newPathParts.push('*')  // accept everything on the /user path
  const newPath = newPathParts.join('/')
  arnParts.push(newPath)
  return arnParts.join(':')
}

module.exports.authenticate = function (params, context) {
    const token = getToken(params);
    const policy = buildPolicy(params.methodArn)
    const auth = getPolicy.bind(this, policy)

    return auth0.users.getInfo(token)
        .then(returnAuth0UserInfo)
        .then(getPrincipalId)
        .then(auth)
        .then(context.succeed)
        .catch(context.fail);
}
