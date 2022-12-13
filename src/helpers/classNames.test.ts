import { classNames } from '@helpers'

describe('classNames', () => {
  test('should concat string with space between', () => {
    expect(classNames('Hello', 'world')).toEqual('Hello world')
  })
})
