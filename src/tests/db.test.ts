import { PrismaClient } from "@prisma/client";
import db from '../config/db'; 

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    user: {
      findMany: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('Prisma Client - db instance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should call $connect on db initialization', async () => {
    await db.$connect();
    expect(db.$connect).toHaveBeenCalledTimes(1);
  });

  it('should call $disconnect on db shutdown', async () => {
    await db.$disconnect();
    expect(db.$disconnect).toHaveBeenCalledTimes(1);
  });
});
