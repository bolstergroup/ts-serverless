import ping from './ping'

const cb = jest.fn()

describe('ping', () => {
  it('Given three arguments - Executes', () => {
    ping({}, {}, cb)
    expect(cb).toBeCalled()
    expect(cb).toMatchSnapshot()
  })

  it('Given no callback - Fails', () => {
    expect(() => {
      ping({}, {}, {})
    }).toThrow(TypeError)
  })
})
