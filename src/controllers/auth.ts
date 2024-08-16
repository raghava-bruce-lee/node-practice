import { RequestHandler, CookieOptions } from 'express';
import { validationResult } from 'express-validator';
import { hash, compare } from 'bcryptjs';
import { sign as createToken } from 'jsonwebtoken';
import { User } from '../models/users';
import { JwtCustomPayload, LoginPayload, SignupPayload } from '../models/common';

export const signup: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, entered data is incorrect!', errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body as SignupPayload;
    const hashedPassword = await hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, entered data is incorrect!', errors: errors.array() });
  }

  try {
    const { email, password } = req.body as LoginPayload;

    const user = await User.findOne({ email });
    if (user) {
      const isCredentialsMatching = await compare(password, user.password);
      if (isCredentialsMatching) {
        const token = createToken(
          { userId: user._id.toString() } as JwtCustomPayload,
          `${process.env.JWT_SECRET_KEY}`,
          { expiresIn: '1h' }
        );

        const options: CookieOptions = {
          httpOnly: true,
          sameSite: 'strict',
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000)
        };

        return res
          .status(200)
          .cookie('access_token', token, options)
          .json({ message: 'Login successful!', token });
      }

      return res.status(401).json({ message: 'Incorrect password!' });
    }

    return res.status(404).json({ message: "User doesn't exist" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const logout: RequestHandler = async (_, res) => {
  return res
    .clearCookie('access_token', { httpOnly: true, sameSite: 'strict' })
    .status(200)
    .json({ message: 'Logged out succesfully' });
};

export const getLoginStatus: RequestHandler = async (_, res) => {
  return res.status(200).json({ loginStatus: true });
};
