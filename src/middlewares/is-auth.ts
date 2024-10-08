import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtCustomPayload } from '../models/common';
import constants from '../constants/common';

export const isAuth: RequestHandler = (req, res, next) => {
  const cookie = req.get(constants.COOKIE);
  if (!cookie) {
    return res.status(401).json({ message: constants.NOT_AUTHORIZED });
  }

  const token = cookie.split('=')[1];
  let decodedToken: JwtCustomPayload | null = null;
  try {
    decodedToken = verify(token, `${process.env.JWT_SECRET_KEY}`) as JwtCustomPayload;
  } catch (error) {
    return res.status(401).json({ message: constants.NOT_AUTHORIZED, error });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: constants.NOT_AUTHORIZED });
  }

  req.userId = decodedToken.userId;
  next();
};
