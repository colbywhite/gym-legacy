const spliceIntoChunks = (arr, chunkLength) => {
  var results = [],
    numChunks = Math.ceil(arr.length / chunkLength)
    i = 0,
    j = chunkLength - 1;
  while(results.length < numChunks) {
    results.push(arr.slice(i, j+1))
    i += chunkLength
    j += chunkLength
  }
  return results;
}

module.exports = {
  spliceIntoChunks: spliceIntoChunks
}
