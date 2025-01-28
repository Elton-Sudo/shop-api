import { User } from '@prisma/client';
import db from '../config/db';
import ApiError from '../utils/errors/APIErrors';

class UserService {
  /**
   * Get all users
   * @returns Promise<User[]>
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await db.user.findMany();
    } catch (error) {
      throw ApiError.internal('Error retrieving users from the database');
    }
  }

  /**
   * Get a user by ID
   * @param id - User ID
   * @returns Promise<User | null>
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        throw ApiError.notFound('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error; // Rethrow custom error
      }
      throw ApiError.internal('Error retrieving user from the database');
    }
  }

  /**
   * Create a new user
   * @param userData - User data
   * @returns Promise<User>
   */
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    try {
      return await db.user.create({
        data: userData,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma unique constraint violation (e.g., email already exists)
        throw ApiError.badRequest('User with this email already exists');
      }
      throw ApiError.internal('Error creating user');
    }
  }

  /**
   * Update a user by ID
   * @param id - User ID
   * @param updateData - Data to update
   * @returns Promise<User>
   */
  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    try {
      const user = await db.user.update({
        where: { id: Number(id) },
        data: updateData,
      });

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        throw ApiError.notFound('User not found to update');
      }
      throw ApiError.internal('Error updating user');
    }
  }

  /**
   * Delete a user by ID
   * @param id - User ID
   * @returns Promise<User>
   */
  async deleteUser(id: string): Promise<User> {
    try {
      const user = await db.user.delete({
        where: { id: Number(id) },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error code for not found
        throw ApiError.notFound('User not found to delete');
      }
      throw ApiError.internal('Error deleting user');
    }
  }

  /**
   * Get a user by email
   * @param email - User email
   * @param password - User password
   * @returns Promise<User | null>
   */
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await db.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      throw ApiError.internal('Error retrieving user from the database');
    }
  }
}

export default new UserService();
