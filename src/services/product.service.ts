import { Product } from '@prisma/client';
import prisma from '../config/db';
import ApiError from '../utils/errors/APIErrors';
import logger from 'src/utils/logger';

class ProductService {
  /**
   * Get all products
   * @returns Promise<Product[]>
   */
  async getAllProducts() {
    try {
      const products = await prisma.product.findMany();

      if (!products) {
        throw ApiError.notFound('No products found');
      }

      return products;
    } catch (error) {
      logger.error(`Error retrieving products from the database: `, error);
      throw ApiError.internal('Error retrieving products from the database');
    }
  }

  /**
   * Get a product by ID
   * @param id - Product ID
   * @returns Promise<Product | null>
   */
  async getProductById(id: string) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product) {
        throw ApiError.notFound('Product not found');
      }

      return product;
    } catch (error) {
      if (error instanceof ApiError) {
        logger.error(`Error: `, error);
        throw error;
      }

      logger.error(`Error retrieving product with ID: ${id} from the database`);
      throw ApiError.internal(
        `Error retrieving product with ID: ${id} from the database`,
      );
    }
  }
  /**
   * Create a new product
   * @param productData - Product data
   * @returns Promise<Product>
   */
  async createProduct(productData: any) {
    try {
      return await prisma.product.create({
        data: productData,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Handle Prisma unique constraint violation
        logger.error('Product with this name already exists');
        throw ApiError.badRequest('Product with this name already exists');
      }

      logger.error('Error creating product');
      throw ApiError.internal('Error creating product');
    }
  }

  /**
   * Update a product by ID
   * @param id - Product ID
   * @param productData - Data to update
   * @returns Promise<Product>
   */
  async updateProduct(id: string, productData: any) {
    try {
      return await prisma.product.update({
        where: { id: Number(id) },
        data: productData,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        logger.error(`Product not found`, error);
        throw ApiError.notFound(`Product not found`);
      }

      logger.error(`Error updating product with ID: ${id}`, error);
      throw ApiError.internal(`Error updating product with ID: ${id}`);
    }
  }

  /**
   * Delete a product by ID
   * @param id - Product ID
   * @returns Promise<Product>
   */
  async deleteProduct(id: string) {
    try {
      return await prisma.product.delete({
        where: { id: Number(id) },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        logger.error(`Product not found`, error);
        throw ApiError.notFound(`Product not found`);
      }

      logger.error(`Error deleting product with ID: ${id}`, error);
      throw ApiError.internal(`Error deleting product with ID: ${id}`);
    }
  }
}

export default new ProductService();
