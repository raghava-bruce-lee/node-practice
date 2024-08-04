import { RequestHandler } from 'express';
import constants from '../constants/common';

export const get404Error: RequestHandler = (_, res) => {
  res.status(404).json({ message: constants.NOT_FOUND });
};
