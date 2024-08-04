import { Router } from 'express';
import { body } from 'express-validator';
import { User } from '../models/users';
import { signup, login } from '../controllers/auth';
import { AUTH_REQUEST } from '../constants/todos';
import constants from '../constants/common';

const router = Router();

router.put(
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

export default router;
