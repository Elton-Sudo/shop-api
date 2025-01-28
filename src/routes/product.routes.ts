import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import authMiddleware from 'src/middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware(false), ProductController.getAllProducts);
router.get('/:id', authMiddleware(false), ProductController.getProductById);
router.post('/', authMiddleware(true), ProductController.createProduct);
router.put('/:id', authMiddleware(true), ProductController.updateProduct);
router.delete('/:id', authMiddleware(true), ProductController.deleteProduct);

export default router;
