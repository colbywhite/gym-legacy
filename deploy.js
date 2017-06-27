#!/usr/bin/env node

const cpp = require('child_process')
  exp = cpp.spawn('exp',['build:android', '--non-interactive']);

const logStream = (stream) => {
  console.log(stream.toString())
}
const logDots = (stream) => {
  process.stdout.write('.')
}
const errStream = (stream) => {
  console.error(stream.toString())
}

const waitForBuild = () => {
  const proc = cpp.spawn('exp',['build:status'])
  var allStdOut = ''
  // proc.stderr.on('data', errStream)
  proc.stdout.on('data', (stream) => {
    logDots(stream)
    allStdOut += stream.toString()
  })
  const inProgressRegex = /Android: Build in progress\.*/g
  const doneRegex = /APK: https?:\/\/[\w\d\-\.\/\%]+\.apk/g

  proc.on('exit', (code) => {
    console.log()
    const exit_status=code.toString()
    const doneResult = doneRegex.exec(allStdOut)
    const inProgressResult = inProgressRegex.exec(allStdOut)
    if(exit_status!='0') {
      console.error('Could not run build:status')
      process.exit(1);
    } else if(doneResult) {
      console.log(doneResult[0])
    } else if(inProgressResult) {
      console.log(inProgressResult[0], 'Sleeping for 30s')
      setTimeout(waitForBuild, 30000);
    } else {
      console.error('Could not determine status')
      process.exit(2);
    }
  })
}

exp.stdout.on('data', logStream)
exp.stderr.on('data', errStream)
exp.on('exit', (code) => {
  console.log()
  const exit_status=code.toString()
  if(exit_status=='0') {
    console.log('Build started; waiting for completion')
    waitForBuild()
  } else {
    console.log(`Could not start build: exit.code=${exit_status}`)
  }
});
