import prisma from '../config/db';
import ApiError from '../utils/errors/APIErrors';

class ProductService {
  /**
   * Get all products
   * @returns Promise<Product[]>
   */
  async getAllProducts() {
    try {
      return await prisma.product.findMany();
    } catch (error) {
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
        throw error; // Rethrow custom error
      }
      throw ApiError.internal('Error retrieving product from the database');
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
    } catch (error) {
      if (error.code === 'P2002') {
        // Handle Prisma unique constraint violation (e.g., unique product name or code)
        throw ApiError.badRequest('Product with this name already exists');
      }
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
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: productData,
      });

      return product;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        throw ApiError.notFound('Product not found to update');
      }
      throw ApiError.internal('Error updating product');
    }
  }

  /**
   * Delete a product by ID
   * @param id - Product ID
   * @returns Promise<Product>
   */
  async deleteProduct(id: string) {
    try {
      const product = await prisma.product.delete({
        where: { id: Number(id) },
      });

      return product;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        throw ApiError.notFound('Product not found to delete');
      }
      throw ApiError.internal('Error deleting product');
    }
  }
}

export default new ProductService();
