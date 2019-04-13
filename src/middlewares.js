//middleware approach
const setHeaders = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3891')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}


export {setHeaders}
