import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../utils/enum/httpStatusCode.enum';
import { verifyToken } from '../utils/jwt.util';
import logger from '../utils/logger'; // Fixed import path

export default function authMiddleware(
  requireAuth: boolean = true,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      if (!requireAuth) {
        return next();
      }

      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        logger.error('Unauthorized Access Attempt: No token provided.');
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: 'Access denied. No token provided.',
        });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        logger.error('Unauthorized Access Attempt: Invalid or expired token.');
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid or expired token.',
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      logger.error(`Authentication Middleware Error: ${error}`);
      next(error); 
    }
  };
}
