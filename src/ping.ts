import { successResponse, runWarm } from './utils'

export default runWarm((request, context, callback) => {
  callback(null, successResponse('pong'))
})
