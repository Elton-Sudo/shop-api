import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HttpStatusCode } from '../utils/enum/httpStatusCode.enum';

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export default function authMiddleware(requireAuth: boolean = true) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!requireAuth) {
      // Skip authentication check if requireAuth is false
      return next();
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, secretKey);

      // Attach the decoded user info to the request object
      req.user = decoded;
      next();
    } catch (error) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid or expired token.',
      });
    }
  };
}
