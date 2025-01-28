import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authMiddleware from 'src/middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware(false), OrderController.getAllOrders);
router.get('/:id', authMiddleware(false), OrderController.getOrderById);
router.post('/', authMiddleware(true), OrderController.createOrder);
router.put('/:id', authMiddleware(true), OrderController.updateOrder);
router.delete('/:id', authMiddleware(true), OrderController.deleteOrder);

export default router;
