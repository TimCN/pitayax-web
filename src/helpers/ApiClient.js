import superagent from 'superagent'
import config from '../config'

const methods = [ 'get', 'post', 'put', 'patch', 'del' ]

function formatUrl (path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    //return 'http://10.10.73.207:8088' + adjustedPath
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  //return 'http://10.10.73.207:8088' + adjustedPath
  return adjustedPath
}

const ApiClient = (req) => {
  // constructor (req) {
  return methods.reduce((ret, method) => {
    ret[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
      const request = superagent[method](formatUrl(path))

      if (params) {
        request.query(params)
      }

      if (__SERVER__ && req.get('cookie')) {
        request.set('cookie', req.get('cookie'))
      }

      if (data) {
        request.send(data)
      }

      request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body))
    })
    return ret
  }, {})
  // }
}

export default ApiClient
