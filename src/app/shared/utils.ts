export function spliceIntoChunks(arr: any[], chunkLength: number): any[][] {
  let results: any[][] = []
  let numChunks = Math.ceil(arr.length / chunkLength)
  let i = 0
  let j = chunkLength - 1
  while(results.length < numChunks) {
    results.push(arr.slice(i, j+1))
    i += chunkLength
    j += chunkLength
  }
  return results;
}
