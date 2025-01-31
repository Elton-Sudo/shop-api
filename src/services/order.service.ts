import { Order } from '@prisma/client';
import prisma from '../config/db';
import ApiError from '../utils/errors/APIErrors';
import logger from 'src/utils/logger';

class OrderService {
  /**
   * Get all orders
   * @returns Promise<Order[]>
   */
  async getAllOrders() {
    try {
      const orders = await prisma.order.findMany();

      if (!orders) {
        throw ApiError.notFound('No orders found');
      }

      return orders;
    } catch (error) {
      logger.error('Error retrieving orders from the database: ', error);
      throw ApiError.internal('Error retrieving orders from the database');
    }
  }

  /**
   * Get an order by ID
   * @param id - Order ID
   * @returns Promise<Order | null>
   */
  async getOrderById(id: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
      });

      if (!order) {
        throw ApiError.notFound('Order not found');
      }

      return order;
    } catch (error) {
      if (error instanceof ApiError) {
        logger.error('Error: ', error);
        throw error;
      }

      logger.error(
        `Error retrieving order with ID: ${id} from the database`,
        error,
      );
      throw ApiError.internal(
        `Error retrieving order with ID: ${id} from the database`,
      );
    }
  }

  /**
   * Create a new order
   * @param orderData - Order data
   * @returns Promise<Order>
   */
  async createOrder(orderData: any): Promise<Order> {
    try {
      return await prisma.order.create({
        data: orderData,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Handle Prisma unique constraint violation
        logger.error('Order with this reference already exists: ', error);
        throw ApiError.badRequest('Order with this reference already exists');
      }

      logger.error('Error creating order: ', error);
      throw ApiError.internal('Error creating order');
    }
  }

  /**
   * Update an order by ID
   * @param id - Order ID
   * @param orderData - Data to update
   * @returns Promise<Order>
   */
  async updateOrder(id: string, orderData: any) {
    try {
      return await prisma.order.update({
        where: { id: Number(id) },
        data: orderData,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        logger.error('Order not found to update: ', error);
        throw ApiError.notFound('Order not found to update');
      }

      logger.error(`Error updating with ID: ${id} order`, error);
      throw ApiError.internal(`Error updating with ID: ${id} order`);
    }
  }

  /**
   * Delete an order by ID
   * @param id - Order ID
   * @returns Promise<Order>
   */
  async deleteOrder(id: string): Promise<Order> {
    try {
      return await prisma.order.delete({
        where: { id: Number(id) },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        logger.error('Order not found to delete: ', error);
        throw ApiError.notFound('Order not found to delete');
      }

      logger.error(`Error deleting with ID: ${id} order: `, error);
      throw ApiError.internal(`Error deleting with ID: ${id} order`);
    }
  }
}

export default new OrderService();
