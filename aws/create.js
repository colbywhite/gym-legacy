const AWSCFMonitor = require('aws-cf-monitor')
const req = require('require-yml')
const template = req('./stack')

// use the same params that the AWS.CloudFormation object normally takes
const name = 'gym-legacy'
const params = {
  StackName: name,
  Capabilities: [
    'CAPABILITY_IAM'
  ],
  TemplateBody: JSON.stringify(template)
}

AWSCFMonitor.createStack(params)
  .then((finalStatus) => {
    console.log(`Hooray, the stack is ${finalStatus}`);
    console.log('And I didn\'t have to write a bunch of boilerplate to wait for it!');
  })
  .catch(console.error)
