import { Request, Response, RequestHandler } from 'express';
import UserService from '../services/user.service';
import { HttpStatusCode } from '../utils/enum/httpStatusCode.enum';

class UserController {
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await UserService.getUserByEmail(email);

    res.status(HttpStatusCode.OK).json({ success: true, data: { token } });
  }

  async getAllUsers(res: Response): Promise<void> {
    const users = await UserService.getAllUsers();

    res.status(HttpStatusCode.OK).json({ success: true, data: users });
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    res.status(HttpStatusCode.OK).json({ success: true, data: user });
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    const newUser = await UserService.createUser(userData);

    res.status(HttpStatusCode.CREATED).json({ success: true, data: newUser });
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await UserService.updateUser(id, updateData);

    res.status(HttpStatusCode.OK).json({ success: true, data: updatedUser });
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await UserService.getUserById(id);
    await UserService.deleteUser(id);

    res.status(HttpStatusCode.NO_CONTENT).send();
  }
}

export default new UserController();
