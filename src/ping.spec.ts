import ping from './ping'

describe('ping', () => {
  it('Given three arguments, executes', () => {
    const cb = jest.fn()
    ping({}, {}, cb)
    expect(cb).toBeCalled()
    expect(cb).toMatchSnapshot()
  })
})
