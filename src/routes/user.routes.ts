import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', authMiddleware(true), UserController.getAllUsers);
router.get('/:id', authMiddleware(true), UserController.getUserById);
router.post('/', authMiddleware(true), UserController.createUser);
router.put('/:id', authMiddleware(true), UserController.updateUser);
router.delete('/:id', authMiddleware(true), UserController.deleteUser);

// Authentication routes
router.post('/register', authMiddleware(true), UserController.createUser);
router.post('/login', authMiddleware(true), UserController.loginUser);

export default router;
