import { User } from '@prisma/client';
import db from '../config/db';
import ApiError from '../utils/errors/APIErrors';
import logger from 'src/utils/logger';

class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await db.user.findMany();

      if (!users) {
        throw ApiError.notFound('No users found');
      }

      return users;
    } catch (error) {
      logger.error('Error retrieving users: ', error);
      throw ApiError.internal('Error retrieving users');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        throw ApiError.notFound('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        logger.error('Error: ', error);
        throw error;
      }

      logger.error(`Error retrieving user with ID: ${id}`, error);
      throw ApiError.internal(`Error retrieving user with ID: ${id}`);
    }
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    try {
      return await db.user.create({
        data: userData,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Prisma error code for unique constraint violation
        logger.error('Error: ', error);
        throw ApiError.badRequest('User with this email already exists');
      }

      logger.error('Error creating user: ', error);
      throw ApiError.internal('Error creating user');
    }
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    try {
      const user = await db.user.update({
        where: {
          id: Number(id),
        },
        data: updateData,
      });

      return user;
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        logger.error('Error: ', error);
        throw ApiError.notFound('User not found to update');
      }

      logger.error('Error updating user: ', error);
      throw ApiError.internal('Error updating user');
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await db.user.delete({
        where: {
          id: Number(id),
        },
      });

      return user;
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        logger.error('Error: ', error);
        throw ApiError.notFound('User not found to delete');
      }

      logger.error('Error deleting user: ', error);
      throw ApiError.internal('Error deleting user');
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      logger.error('Error retrieving user from the database: ', error);
      throw ApiError.internal('Error retrieving user from the database');
    }
  }
}

export default new UserService();
