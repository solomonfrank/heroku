/* eslint-disable consistent-return */
import express from 'express';
import Joi from 'joi';
import session from 'express-session';
import bodyParser from 'body-parser';
import User from '../model/user';
import Admin from '../model/admin';
import Account from '../model/account';
import Superadmin from '../model/superadmin';
import Cashier from '../model/cashier';

import { usersAccount } from '../model/database';

const router = express.Router();

const app = express();
// eslint-disable-next-line no-use-before-define
app.use(bodyParser.json());
// eslint-disable-next-line no-use-before-define
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// sign up route
router.post('/sign-up', (req, res) => {
  const schema = {
    firstName: Joi.string()
      .trim()

      .min(3)
      .max(20)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    lastName: Joi.string()

      .trim()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: '!!Password do not match',
          },
        },
      }),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).json({ msg: result.error.details[0].message });
    return;
  }
  const { email } = req.body;
  const { password } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;

  // let user =    new User(firstName,lastName,password,email);
  const person = new User(firstName, lastName, password, email);

  const userDetail = person.save();
  // user.save();

  // eslint-disable-next-line consistent-return
  if (!userDetail) return res.status(400).json({ status: 400, msg: 'error in the values your submitted' });
  res.status(200).json({ status: 200, data: userDetail });
  // console.log(session.users);
});

// sign in route

router.post('/sign-in', (req, res) => {
  const schema = {
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .trim(),

    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .trim(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).json({ msg: result.error.details[0].message });
    return;
  }
  const { email } = req.body;
  const { password } = req.body;

  const user = User.login(email, password);
  // eslint-disable-next-line consistent-return
  if (!user) return res.status(400).json({ status: 400, msg: 'invalid credential' });

  res.status(200).json({ status: 200, data: user });
});

// created account route
router.post('/create-account', (req, res) => {
  if (session.loggedIn) {
    const schema = {
      firstName: Joi.string()
        .trim()

        .min(3)
        .max(20)
        .required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      type: Joi.string().trim(),
      openingBalance: Joi.number(),
      lastName: Joi.string()

        .trim()
        .min(3)
        .max(20)
        .required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).json({ msg: result.error.details[0].message });
      return;
    }
    const { email } = req.body;
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { openingBalance } = req.body;
    const { type } = req.body;

    const person = new Account(
      firstName,
      lastName,
      email,
      type,
      openingBalance,
    );
    const user = person.save();
    res.status(200).json({ status: 200, data: user });
  } else {
    res
      .status(400)
      .json({ status: 400, msg: 'you must login to create an account' });
  }
  // console.log(session.account);
});

// logout route
router.get('/logout', (req, res) => {
  User.logout();

  session.userId = '';

  session.staffId = '';

  session.cashierId = '';

  res.json({ msg: 'you have successfully sign out' });
});

// delete user route

// eslint-disable-next-line consistent-return
router.delete('/accounts/:accountNumber', (req, res) => {
  if (session.staffId) {
    // eslint-disable-next-line radix
    // eslint-disable-next-line prettier/prettier
    const acc = parseInt(req.params.accountNumber, 10);

    const admin = new Admin();
    const foundvalue = admin.deleteAcc(acc, usersAccount);

    if (!foundvalue) {
      return res.status(404).json({ status: 404, msg: 'account not found' });
    }

    res.status(200).json({ status: 200, msg: 'account deleted successfully' });
  } else {
    res.status(401).json({ status: 401, msg: 'you must login to continue' });
  }
});

// fetch user
router.get('/accounts/:accountNumber', (req, res) => {
  if (session.type !== 'client') {
    if (session.staffId !== '' || session.cashierId !== '') {
      const acc = parseInt(req.params.accountNumber, 10);
      const admin = new Admin();
      const account = admin.findOne(acc, usersAccount);
      // eslint-disable-next-line no-console
      console.log(account);
      // eslint-disable-next-line no-console
      console.log(typeof account);
      if (!account) {
        return res.status(200).json({ status: 200, data: 'account not found' });
      }
      res.status(200).json({ status: 200, data: account });
    } else {
      // User.login(email,password);
      res.status(401).json({ status: 401, msg: 'you must login to continue' });
    }
  } else {
    return res.status(403).json({ status: 403, msg: 'unauthorized page' });
  }
});
// patch user
// eslint-disable-next-line consistent-return
router.patch('/accounts/:accountNumber', (req, res) => {
  const acc = parseInt(req.params.accountNumber, 10);
  if (session.staffId) {
    const admin = new Admin();
    const arr = admin.activateAcc(acc, usersAccount);
    if (!arr) {
      return res.status(404).json({ status: 404, msg: 'account not found' });
    }

    res.status(200).json({ status: 200, data: arr });
  } else {
    // User.login(email,password);
    return res
      .status(401)
      .json({ status: 401, msg: 'you must login to continue' });
  }
});

router.post('/add-admin', (req, res) => {
  const schema = {
    firstName: Joi.string()
      .trim()

      .min(3)
      .max(20)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    lastName: Joi.string()

      .trim()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    type: Joi.string()

      .trim()
      .min(3)
      .max(20)
      .required(),
    isAdmin: Joi.boolean().required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match',
          },
        },
      }),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).json({ msg: result.error.details[0].message });
    return;
  }
  const { firstName } = req.body;
  const { email } = req.body;
  const { lastName } = req.body;
  let { type } = req.body;
  const { password } = req.body;
  let { isAdmin } = req.body;

  // let admin = new Superadmin();

  const lastInserted = Superadmin.addStaff(
    firstName,
    lastName,
    password,
    email,
    // eslint-disable-next-line no-self-assign
    (type = type),
    // eslint-disable-next-line no-self-assign
    (isAdmin = isAdmin),
  );
  if (!lastInserted) {
    res.status(400).json({ msg: 'user could not added' });
  }
  // console.log(usersData);
  res.status(200).json({ status: 200, data: lastInserted });
  // console.log(session.users);
});

// credit account
router.post('/transaction/:accountNumber/credit', (req, res) => {
  if (session.cashierId || session.staffId) {
    const accNum = parseInt(req.params.accountNumber, 10);
    const { amount } = req.body;

    const cashier = new Cashier();
    const credited = cashier.credit(
      accNum,
      usersAccount,
      session.cashierId,
      amount,
    );
    // eslint-disable-next-line no-console
    console.log(credited);
    if (!credited) {
      return res.status(404).json({ status: 404, msg: 'account not found' });
    }
    res.status(200).json({ status: 200, data: credited });
  } else {
    return res
      .status(403)
      .json({ status: 403, msg: 'you must login to accessible the page' });
  }
});

// debit account
router.post('/transaction/:accountNumber/debit', (req, res) => {
  if (session.cashierId || session.staffId) {
    const accNum = parseInt(req.params.accountNumber, 10);
    const { amount } = req.body;

    const cashier = new Cashier();
    const credited = cashier.debit(
      accNum,
      usersAccount,
      session.cashierId,
      amount,
    );
    // eslint-disable-next-line no-console
    console.log(credited);
    if (!credited) {
      return res.status(404).json({ status: 404, msg: 'account not found' });
    }
    res.status(200).json({ status: 200, data: credited });
  } else {
    return res
      .status(403)
      .json({ status: 403, msg: 'you must login to accessible the page' });
  }
});

// fetch all account

router.get('/accounts', (req, res) => {
  if (session.staffId) {
    const admin = new Admin();
    const result = admin.findAll();
    if (result.length === 0) {
      return res.status(200).json({ status: 200, data: 'no record found' });
    }

    res.status(200).json({ status: 200, data: result });
  } else {
    return res.status(400).json({ status: 400, msg: 'you must login' });
  }
});
export default router;
