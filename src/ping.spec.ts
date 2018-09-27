import ping from './ping'

describe('ping', () => {
  it('executes as expected', () => {
    const cb = jest.fn()
    ping({}, {}, cb)
    expect(cb).toBeCalled()
    expect(cb).toMatchSnapshot()
  })
})
