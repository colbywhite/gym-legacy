const AWS = require('aws-sdk');
const BbPromise = require('bluebird');
const client = BbPromise.promisifyAll(new AWS.DynamoDB.DocumentClient());
const stronglifts = require('./programs/stronglifts');
const candito_squat = require('./programs/candito_squat');
const standards = [stronglifts, candito_squat]
const SCHEDULE_TABLE = 'schedules'

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

const getSchedules = (userid) => {
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

const parseStartDates= (schedules) => {
  return schedules.reduce((result, schedule) => {
    console.log(schedule.name, schedule.start_date)
    result[schedule.name] = schedule.start_date
    return result
  }, {})
}

module.exports.getAll = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  getSchedules(user_id)
    .then(parseStartDates)
    .then((start_dates) => {
      return standards.map((program) => {
        program.start_date = start_dates[program.name]
        return program
      })
    })
    .then(successResponse)
    .catch(errorResponse)
}
