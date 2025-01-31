import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { StringValue } from 'ms';
import logger from './logger';

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateToken = (
  payload: object,
  expiresIn: StringValue | number = '1h',
): string => {
  try {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, secretKey, options);
  } catch (error) {
    logger.error('Error generating token: ', error);
    throw new Error('Error generating token');
  }
};


export const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    logger.error('You Shall Not Pass: ', error);
    throw new Error('Invalid or expired token');
  }
};
