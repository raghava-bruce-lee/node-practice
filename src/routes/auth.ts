import { Router } from 'express';
import { body } from 'express-validator';
import { User } from '../models/users';
import { signup, login } from '../controllers/auth';

const router = Router();

router.put(
  '/signup',
  [
    body('name').trim().notEmpty(),
    body('password').trim().isLength({ min: 5 }),
    body('email')
      .isEmail()
      .custom(async (value) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject('E-mail address already exists!');
        }
      })
  ],
  signup
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').trim().isLength({ min: 5 })],
  login
);

export default router;
