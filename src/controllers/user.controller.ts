import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { HttpStatusCode } from '../utils/enum/httpStatusCode.enum';

class UserController {
  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await UserService.getUserByEmail(email);

      if (!token) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ success: false, message: 'Invalid credentials' });
        return;
      }

      res.status(HttpStatusCode.OK).json({ success: true, data: { token } });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      if (users.length === 0) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: false, message: 'No users found' });
        return;
      }
      res.status(HttpStatusCode.OK).json({ success: true, data: users });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error retrieving users',
        error: error.message,
      });
    }
  }

  // Get user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      if (!user) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: false, message: 'User not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json({ success: true, data: user });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error retrieving user',
        error: error.message,
      });
    }
  }

  // Create a new user
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      if (!userData || !userData.email || !userData.password) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ success: false, message: 'Missing required fields' });
        return;
      }

      const newUser = await UserService.createUser(userData);
      res.status(HttpStatusCode.CREATED).json({ success: true, data: newUser });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error creating user',
        error: error.message,
      });
    }
  }

  // Update an existing user
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedUser = await UserService.updateUser(id, updateData);

      if (!updatedUser) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: false, message: 'User not found to update' });
        return;
      }

      res.status(HttpStatusCode.OK).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error updating user',
        error: error.message,
      });
    }
  }

  // Delete a user
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById(id);

      if (!user) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: false, message: 'User not found' });
        return;
      }

      await UserService.deleteUser(id);
      res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error deleting user',
        error: error.message,
      });
    }
  }
}

export default new UserController();
