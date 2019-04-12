"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _joi = _interopRequireDefault(require("joi"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("../model/user"));

var _admin = _interopRequireDefault(require("../model/admin"));

var _account = _interopRequireDefault(require("../model/account"));

var _superadmin = _interopRequireDefault(require("../model/superadmin"));

var _cashier = _interopRequireDefault(require("../model/cashier"));

var _database = require("../model/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var router = _express["default"].Router();

var app = (0, _express["default"])(); // eslint-disable-next-line no-use-before-define

app.use(_bodyParser["default"].json()); // eslint-disable-next-line no-use-before-define

app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // sign up route

router.post('/sign-up', function (req, res) {
  var schema = {
    firstName: _joi["default"].string().trim().min(3).max(20).required(),
    password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/),
    lastName: _joi["default"].string().trim().min(3).max(20).required(),
    email: _joi["default"].string().email({
      minDomainAtoms: 2
    }).required(),
    confirmPassword: _joi["default"].string().required().valid(_joi["default"].ref('password')).options({
      language: {
        any: {
          allowOnly: '!!Password do not match'
        }
      }
    })
  };

  var result = _joi["default"].validate(req.body, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error.details[0].message
    });
    return;
  }

  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName; // let user =    new User(firstName,lastName,password,email);

  var person = new _user["default"](firstName, lastName, password, email);
  var userDetail = person.save(); // user.save();
  // eslint-disable-next-line consistent-return

  if (!userDetail) return res.status(400).json({
    status: 400,
    msg: 'error in the values your submitted'
  });
  res.status(200).json({
    status: 200,
    data: userDetail
  }); // console.log(session.users);
}); // sign in route

router.post('/sign-in', function (req, res) {
  var schema = {
    password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/).trim(),
    email: _joi["default"].string().email({
      minDomainAtoms: 2
    }).required().trim()
  };

  var result = _joi["default"].validate(req.body, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error.details[0].message
    });
    return;
  }

  var email = req.body.email;
  var password = req.body.password;

  var user = _user["default"].login(email, password); // eslint-disable-next-line consistent-return


  if (!user) return res.status(400).json({
    status: 400,
    msg: 'invalid credential'
  });
  res.status(200).json({
    status: 200,
    data: user
  });
}); // created account route

router.post('/create-account', function (req, res) {
  if (_expressSession["default"].loggedIn) {
    var schema = {
      firstName: _joi["default"].string().trim().min(3).max(20).required(),
      email: _joi["default"].string().email({
        minDomainAtoms: 2
      }),
      type: _joi["default"].string().trim(),
      openingBalance: _joi["default"].number(),
      lastName: _joi["default"].string().trim().min(3).max(20).required()
    };

    var result = _joi["default"].validate(req.body, schema);

    if (result.error) {
      res.status(400).json({
        msg: result.error.details[0].message
      });
      return;
    }

    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var openingBalance = req.body.openingBalance;
    var type = req.body.type;
    var person = new _account["default"](firstName, lastName, email, type, openingBalance);
    var user = person.save();
    res.status(200).json({
      status: 200,
      data: user
    });
  } else {
    res.status(400).json({
      status: 400,
      msg: 'you must login to create an account'
    });
  } // console.log(session.account);

}); // logout route

router.get('/logout', function (req, res) {
  _user["default"].logout();

  _expressSession["default"].userId = '';
  _expressSession["default"].staffId = '';
  _expressSession["default"].cashierId = '';
  res.json({
    msg: 'you have successfully sign out'
  });
}); // delete user route
// eslint-disable-next-line consistent-return

router["delete"]('/accounts/:accountNumber', function (req, res) {
  if (_expressSession["default"].staffId) {
    // eslint-disable-next-line radix
    // eslint-disable-next-line prettier/prettier
    var acc = parseInt(req.params.accountNumber, 10);
    var admin = new _admin["default"]();
    var foundvalue = admin.deleteAcc(acc, _database.usersAccount);

    if (!foundvalue) {
      return res.status(404).json({
        status: 404,
        msg: 'account not found'
      });
    }

    res.status(200).json({
      status: 200,
      msg: 'account deleted successfully'
    });
  } else {
    res.status(401).json({
      status: 401,
      msg: 'you must login to continue'
    });
  }
}); // fetch user

router.get('/accounts/:accountNumber', function (req, res) {
  if (_expressSession["default"].type !== 'client') {
    if (_expressSession["default"].staffId !== '' || _expressSession["default"].cashierId !== '') {
      var acc = parseInt(req.params.accountNumber, 10);
      var admin = new _admin["default"]();
      var account = admin.findOne(acc, _database.usersAccount); // eslint-disable-next-line no-console

      console.log(account); // eslint-disable-next-line no-console

      console.log(_typeof(account));

      if (!account) {
        return res.status(200).json({
          status: 200,
          data: 'account not found'
        });
      }

      res.status(200).json({
        status: 200,
        data: account
      });
    } else {
      // User.login(email,password);
      res.status(401).json({
        status: 401,
        msg: 'you must login to continue'
      });
    }
  } else {
    return res.status(403).json({
      status: 403,
      msg: 'unauthorized page'
    });
  }
}); // patch user
// eslint-disable-next-line consistent-return

router.patch('/accounts/:accountNumber', function (req, res) {
  var acc = parseInt(req.params.accountNumber, 10);

  if (_expressSession["default"].staffId) {
    var admin = new _admin["default"]();
    var arr = admin.activateAcc(acc, _database.usersAccount);

    if (!arr) {
      return res.status(404).json({
        status: 404,
        msg: 'account not found'
      });
    }

    res.status(200).json({
      status: 200,
      data: arr
    });
  } else {
    // User.login(email,password);
    return res.status(401).json({
      status: 401,
      msg: 'you must login to continue'
    });
  }
});
router.post('/add-admin', function (req, res) {
  var schema = {
    firstName: _joi["default"].string().trim().min(3).max(20).required(),
    password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/),
    lastName: _joi["default"].string().trim().min(3).max(20).required(),
    email: _joi["default"].string().email({
      minDomainAtoms: 2
    }).required(),
    type: _joi["default"].string().trim().min(3).max(20).required(),
    isAdmin: _joi["default"]["boolean"]().required(),
    confirmPassword: _joi["default"].string().required().valid(_joi["default"].ref('password')).options({
      language: {
        any: {
          allowOnly: '!!Passwords do not match'
        }
      }
    })
  };

  var result = _joi["default"].validate(req.body, schema);

  if (result.error) {
    res.status(400).json({
      msg: result.error.details[0].message
    });
    return;
  }

  var firstName = req.body.firstName;
  var email = req.body.email;
  var lastName = req.body.lastName;
  var type = req.body.type;
  var password = req.body.password;
  var isAdmin = req.body.isAdmin; // let admin = new Superadmin();

  var lastInserted = _superadmin["default"].addStaff(firstName, lastName, password, email, // eslint-disable-next-line no-self-assign
  type = type, // eslint-disable-next-line no-self-assign
  isAdmin = isAdmin);

  if (!lastInserted) {
    res.status(400).json({
      msg: 'user could not added'
    });
  } // console.log(usersData);


  res.status(200).json({
    status: 200,
    data: lastInserted
  }); // console.log(session.users);
}); // credit account

router.post('/transaction/:accountNumber/credit', function (req, res) {
  if (_expressSession["default"].cashierId || _expressSession["default"].staffId) {
    var accNum = parseInt(req.params.accountNumber, 10);
    var amount = req.body.amount;
    var cashier = new _cashier["default"]();
    var credited = cashier.credit(accNum, _database.usersAccount, _expressSession["default"].cashierId, amount); // eslint-disable-next-line no-console

    console.log(credited);

    if (!credited) {
      return res.status(404).json({
        status: 404,
        msg: 'account not found'
      });
    }

    res.status(200).json({
      status: 200,
      data: credited
    });
  } else {
    return res.status(403).json({
      status: 403,
      msg: 'you must login to accessible the page'
    });
  }
}); // debit account

router.post('/transaction/:accountNumber/debit', function (req, res) {
  if (_expressSession["default"].cashierId || _expressSession["default"].staffId) {
    var accNum = parseInt(req.params.accountNumber, 10);
    var amount = req.body.amount;
    var cashier = new _cashier["default"]();
    var credited = cashier.debit(accNum, _database.usersAccount, _expressSession["default"].cashierId, amount); // eslint-disable-next-line no-console

    console.log(credited);

    if (!credited) {
      return res.status(404).json({
        status: 404,
        msg: 'account not found'
      });
    }

    res.status(200).json({
      status: 200,
      data: credited
    });
  } else {
    return res.status(403).json({
      status: 403,
      msg: 'you must login to accessible the page'
    });
  }
}); // fetch all account

router.get('/accounts', function (req, res) {
  if (_expressSession["default"].staffId) {
    var admin = new _admin["default"]();
    var result = admin.findAll();

    if (result.length === 0) {
      return res.status(200).json({
        status: 200,
        data: 'no record found'
      });
    }

    res.status(200).json({
      status: 200,
      data: result
    });
  } else {
    return res.status(400).json({
      status: 400,
      msg: 'you must login'
    });
  }
});
var _default = router;
exports["default"] = _default;