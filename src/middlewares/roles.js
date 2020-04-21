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


const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if ('customer' === user.role || 'admin' === user.role) {
      return next();
    } else if(user === null) {
      console.log(`unauthorized`);
      
      return res.redirect('/');
    } else {
      console.log(`wrong role for this route, CUSTOMER required, but ${user} present`);
      
      return res.redirect('/profile');
    }
  } catch (err) {
    console.log('error');
    
    return res.status(401);
  }
};

export { isUser, isAdmin };
