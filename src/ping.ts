import { successResponse } from './utils'

export default function(request, context, callback) {
  return callback(null, successResponse('pong', false))
}
