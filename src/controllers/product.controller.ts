import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { HttpStatusCode } from '../utils/enum/httpStatusCode.enum';

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const products = await ProductService.getAllProducts();
    res.status(HttpStatusCode.OK).json({ success: true, data: products });
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    if (!product) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ success: false, message: 'Product not found' });
    }
    res.status(HttpStatusCode.OK).json({ success: true, data: product });
  }

  async createProduct(req: Request, res: Response) {
    const productData = req.body;
    const newProduct = await ProductService.createProduct(productData);
    res
      .status(HttpStatusCode.CREATED)
      .json({ success: true, data: newProduct });
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await ProductService.updateProduct(id, productData);
    res.status(HttpStatusCode.OK).json({ success: true, data: updatedProduct });
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    res.status(HttpStatusCode.NO_CONTENT).send();
  }
}

export default new ProductController();
