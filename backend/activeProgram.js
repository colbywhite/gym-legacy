const AWS = require('aws-sdk');
const BbPromise = require('bluebird');
const client = BbPromise.promisifyAll(new AWS.DynamoDB.DocumentClient());
const stronglifts = require('./programs/stronglifts');
const candito_squat = require('./programs/candito_squat');
const standards = [stronglifts, candito_squat]

const HEADERS = {
  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}

const sendResponse = (status, callback, body) => {
  const response = {
    headers: HEADERS,
    statusCode: status,
    body: JSON.stringify(body)
  }
  callback(null, response)
}

const createActiveProgram = (userid, start_date, program) => {
  const item = {
    user_id: userid,
    start_date: start_date.toISOString()
  }
  Object.assign(item, program)
  const params = {
    TableName: 'active_programs',
    Item: item
  }
  console.log('POST', item)
  // TODO should I check if it already exists?
  return client.putAsync(params).then(() => item)
}

const deleteActiveProgram = (userid, name) => {
  const params = {
    TableName: 'active_programs',
    Key: {
      user_id: userid,
      name: name
    }
  }
  console.log('DELETE', params.Key)
  return client.deleteAsync(params)
}

const getActivePrograms = (userid) => {
  const params = {
    TableName: 'active_programs',
    KeyConditionExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ':user_id': userid
    }
  }
  console.log('GET', params.ExpressionAttributeValues)
  return client.queryAsync(params).then((result) => result.Items)
}

module.exports.create = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  const body = JSON.parse(event.body)
  createActiveProgram(user_id, new Date(), body)
    .then(successResponse)
    .catch(errorResponse)
}

module.exports.delete = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  const name = decodeURIComponent(event.pathParameters.name)
  // TODO return No Content
  deleteActiveProgram(user_id, name)
    .then(successResponse)
    .catch(errorResponse)
}

module.exports.get = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  getActivePrograms(user_id)
    .then((actives) => {
      const start_dates = actives.reduce((result, program) => {
        result[program.name] = program.start_date
        return result
      }, {})
      return standards.map((program) => {
        program.start_date = start_dates[program.name]
        return program
      })
    })
    .then(successResponse)
    .catch(errorResponse)
}
