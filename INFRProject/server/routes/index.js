var express = require('express');
var router = express.Router();
const passport=require('passport');
const DB = require('../config/db');
let userModel = require('../model/User');
let User = userModel.User;

//const DB = require('../config/db');
//let userModel = require('../model/User');
//let User = userModel.User;

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Home',
    displayName: req.user ? req.user.displayName: ''
  });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('pages/index', { title: 'Home',
    displayName: req.user ? req.user.displayName: ''
  });
});
/* GET About page. */
router.get('/Aboutus', function(req, res, next) {
  res.render('pages/Aboutus', { title: 'About us',
    displayName: req.user ? req.user.displayName: ''
  });

});
/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('pages/products', { title: 'Products',
    displayName: req.user ? req.user.displayName: ''
  });
});
/* GET service page. */
router.get('/service', function(req, res, next) {
  res.render('pages/services', { title: 'Service',
    displayName: req.user ? req.user.displayName: ''
  });
});
/* GET contactus page. */
router.get('/contactus', function(req, res, next) {
  res.render('pages/contactus', { title: 'Contact Us',
    displayName: req.user ? req.user.displayName: ''
  });
});

router.get('/login', function(req, res, next){
  // built in in passport so it uses small u
  if(!req.user)
  {
    res.render('Auth/login',
      {
        title: 'Login',
        displayName: req.user ? req.user.displayName:'',
        message:req.flash('loginMessage')

      }
    )
  }
  else
  {
    return res.redirect('/')
  }
})
router.post('/login', function(req, res, next){
  passport.authenticate('local', (err, user, info)=>{
    if(err)
    {
      return next(err)
    }
    if(!user)
    {
      req.flash('loginMessage','Authentication Error')
      return res.redirect('/login');
    }

    req.login(user, (err)=>{
      if (err)
      {
        return next(err)
      }
      return res.redirect('/fruitslist')
    })
  }) (req, res, next)
})
router.get('/register', function(req,res,next){
  if (!req.user)
  {
    res.render('Auth/register',{
      title: 'Register',
      displayName: req.user? req.user.displayName:'',
      message:req.flash('registerMessage'),
    })
  }
  else{
    return res.redirect('/')
  }
})
router.post('/register', function(req, res, next){
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName

  })
  User.register(newUser, req.body.password, (err) =>{
    if(err)
    {
      console.log("Error: Inserting the new User");
      if(err.name=="UserExistError")
      {
        req.flash('registerMessage',
          'Registration Error: User already exists')
      
      }
      return res.render('Auth/register',{
        title:'Register',
        displayName:req.user? req.user.displayName:'',
        message: req.flash('registerMessage')
      })
    }
    else
    {
      return passport.authenticate('local')(req,  res, ()=>{
        res.redirect('/fruitslist')
      })
    }

  })
})
router.get('/logout', function(req, res, next){
  req.logOut(function(err){
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/')
})

module.exports = router;
