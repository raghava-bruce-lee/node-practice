import { Router } from 'express';
import { body } from 'express-validator';
import { User } from '../models/users';
import { signup, login, logout, getLoginStatus } from '../controllers/auth';
import { AUTH_REQUEST } from '../constants/todos';
import constants from '../constants/common';
import { isAuth } from '../middlewares/is-auth';

const router = Router();

router.post(
  '/signup',
  [
    body(AUTH_REQUEST.name).trim().notEmpty(),
    body(AUTH_REQUEST.password).trim().isLength({ min: 5 }),
    body(AUTH_REQUEST.email)
      .isEmail()
      .custom(async (value) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject(constants.EMAIL_ALREADY_EXISTS);
        }
      })
  ],
  signup
);

router.post(
  '/login',
  [body(AUTH_REQUEST.email).isEmail(), body(AUTH_REQUEST.password).trim().isLength({ min: 5 })],
  login
);

router.post('/logout', isAuth, logout);

router.get('/login-status', isAuth, getLoginStatus);

export default router;
