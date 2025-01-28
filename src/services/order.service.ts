import prisma from '../config/db';
import ApiError from '../utils/errors/APIErrors';

class OrderService {
  /**
   * Get all orders
   * @returns Promise<Order[]>
   */
  async getAllOrders() {
    try {
      return await prisma.order.findMany();
    } catch (error) {
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
        throw error;
      }
      throw ApiError.internal('Error retrieving order from the database');
    }
  }

  /**
   * Create a new order
   * @param orderData - Order data
   * @returns Promise<Order>
   */
  async createOrder(orderData: any) {
    try {
      return await prisma.order.create({
        data: orderData,
      });
    } catch (error) {
      if (error.code  === 'P2002') {
        // Handle Prisma unique constraint violation (e.g., duplicate order reference)
        throw ApiError.badRequest('Order with this reference already exists');
      }
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
      const order = await prisma.order.update({
        where: { id: Number(id) },
        data: orderData,
      });

      return order;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        throw ApiError.notFound('Order not found to update');
      }
      throw ApiError.internal('Error updating order');
    }
  }

  /**
   * Delete an order by ID
   * @param id - Order ID
   * @returns Promise<Order>
   */
  async deleteOrder(id: string) {
    try {
      const order = await prisma.order.delete({
        where: { id: Number(id) },
      });

      return order;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        throw ApiError.notFound('Order not found to delete');
      }
      throw ApiError.internal('Error deleting order');
    }
  }
}

export default new OrderService();
