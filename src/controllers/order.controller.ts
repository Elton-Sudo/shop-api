import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import { HttpStatusCode } from '../utils/enum/httpStatusCode.enum';

class OrderController {
  async getAllOrders(req: Request, res: Response): Promise<void> {
    const orders = await OrderService.getAllOrders();
    res.status(HttpStatusCode.OK).json({ success: true, data: orders });
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    if (!order) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ success: false, message: 'Order not found' });
      return;
    }
    res.status(HttpStatusCode.OK).json({ success: true, data: order });
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    const orderData = req.body;
    const newOrder = await OrderService.createOrder(orderData);
    res.status(HttpStatusCode.CREATED).json({ success: true, data: newOrder });
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const orderData = req.body;
    const updatedOrder = await OrderService.updateOrder(id, orderData);
    res.status(HttpStatusCode.OK).json({ success: true, data: updatedOrder });
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await OrderService.deleteOrder(id);
    res.status(HttpStatusCode.NO_CONTENT).send();
  }
}

export default new OrderController();
