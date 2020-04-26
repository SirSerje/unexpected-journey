import User from '../models/user';


const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if ('admin' === user.role) {
      return next();
    } else if(user === null) {
      console.log(`unauthorized`);
      
      return res.redirect('/');
    } else {
      console.log(`wrong role for this route, ADMIN required, but ${user} present`);
      
      return res.redirect('/profile');
    }
  } catch (err) {
    console.log('error');
    
    return res.status(401);
  }
};

// TODO: verify, does it work properly
const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if ('customer' === user.role || 'admin' === user.role) {
      return next();
    } else if(!user.role) {
      console.log(`unauthorized`);
      
      return res.status(401).send('unauthorized');
    } else {
      console.log(`wrong role for this route, CUSTOMER or ADMIN required, but ${user.role} present`);
      
      return res.redirect('/profile');
    }
  } catch (err) {
    console.log('error', err);
    
    return res.status(401).send({error: err.message});
  }
};

export { isUser, isAdmin };
