const AWS = require('aws-sdk')
const BbPromise = require('bluebird')
const client = BbPromise.promisifyAll(new AWS.DynamoDB.DocumentClient())
const stronglifts = require('./programs/stronglifts');
const candito_squat = require('./programs/candito_squat');

const HEADERS = {
  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
const SCHEDULE_TABLE = 'schedules'

const sendResponse = (status, callback, body) => {
  const response = {
    headers: HEADERS,
    statusCode: status,
    body: JSON.stringify(body)
  }
  callback(null, response)
}

const createSchedule = (userid, name, start_date, schedule) => {
  var item = {
    user_id: userid,
    start_date: start_date.toISOString(),
    name: name,
    schedule: schedule
  }
  const params = {
    TableName: SCHEDULE_TABLE,
    Item: item
  }
  console.log('POST', item)
  // TODO should I check if it already exists?
  return client.putAsync(params).then(() => item)
}

const deleteSchedule = (userid, name) => {
  const params = {
    TableName: SCHEDULE_TABLE,
    Key: {
      user_id: userid,
      name: name
    }
  }
  console.log('DELETE', params.Key)
  return client.deleteAsync(params)
}

const getSchedule = (userid) => {
  const params = {
    TableName: SCHEDULE_TABLE,
    KeyConditionExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ':user_id': userid
    }
  }
  console.log('GET', params.ExpressionAttributeValues)
  return client.queryAsync(params).then((result) => result.Items)
}

module.exports.post = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  const name = decodeURIComponent(event.pathParameters.name)
  const body = JSON.parse(event.body)
  createSchedule(user_id, name, new Date(), body)
    .then(successResponse)
    .catch(errorResponse)
}

module.exports.delete = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  const name = decodeURIComponent(event.pathParameters.name)
  // TODO return No Content
  deleteSchedule(user_id, name)
    .then(successResponse)
    .catch(errorResponse)
}

module.exports.get = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  const name = decodeURIComponent(event.pathParameters.name)
  getSchedule(user_id)
    .then(successResponse)
    .catch(errorResponse)
}
