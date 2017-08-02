const AWS = require('aws-sdk');
const BbPromise = require('bluebird');

const sendResponse = (status, callback, body) => {
  const response = {
    statusCode: status,
    body: JSON.stringify(body)
  }
  callback(null, response)
}

const createActiveProgram = (userid, start_date, name, program) => {
  const client = BbPromise.promisifyAll(new AWS.DynamoDB.DocumentClient());
  const item = {
    user_id: userid,
    name: name,
    start_date: start_date.toISOString(),
    program: program
  }
  const params = {
    TableName: 'active_programs',
    Item: item
  }
  return client.putAsync(params).then(() => item)
}

module.exports.create = (event, context, callback) => {
  const successResponse = sendResponse.bind(null, 200, callback)
  const errorResponse = sendResponse.bind(null, 500, callback)
  const user_id = event.requestContext.authorizer.principalId
  const body = JSON.parse(event.body)
  createActiveProgram(user_id, new Date(), body.name, body.program)
    .then(successResponse)
    .catch(errorResponse)
}
