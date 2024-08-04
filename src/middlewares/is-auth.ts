import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtCustomPayload } from '../models/common';

export const isAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Not Authorized!' });
    return;
  }

  const token = authHeader.split(' ')[1];
  let decodedToken: JwtCustomPayload | null = null;
  try {
    decodedToken = verify(token, `${process.env.JWT_SECRET_KEY}`) as JwtCustomPayload;
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  if (!decodedToken) {
    res.status(401).json({ message: 'Not Authorized!' });
    return;
  }

  req.userId = decodedToken.userId;
  next();
};
