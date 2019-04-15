//middleware approach
const clientPort = process.env.FRONT;
const setHeaders = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', `http://localhost:${clientPort}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};


export {setHeaders};
