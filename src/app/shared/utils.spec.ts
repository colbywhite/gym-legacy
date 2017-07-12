import { spliceIntoChunks } from './utils'

describe('spliceIntoChunks', () => {
  it('should splice into chunks of desired size', () => {
    const input = [1,2,3,4,5,6,7]
    const result = spliceIntoChunks(input, 2)
    expect(result).toEqual([[1,2],[3,4],[5,6],[7]])
  })
})
