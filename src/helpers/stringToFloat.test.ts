import { stringToFloat } from '@helpers'

describe('stringToFloat', () => {
  test('should convert a string to float', () => {
    expect(stringToFloat('Hello')).toEqual(7.27)
  })
})
