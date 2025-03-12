// src/services/userService.ts
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { Role } from "@/types/user";

export interface RegisterUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export async function registerUser(data: RegisterUserParams) {
  const { firstName, lastName, email, password, role } = data;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user transaction
  interface NewUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
  }

  interface FarmerProfile {
    userId: string;
    isVerified: boolean;
    idVerified: boolean;
    landVerified: boolean;
    bankVerified: boolean;
  }

  const user: NewUser = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      // Create user
      const newUser: NewUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role,
        },
      });

      // If user is a farmer, create their profile
      if (role === "FARMER") {
        const farmerProfile: FarmerProfile = {
          userId: newUser.id,
          isVerified: false,
          idVerified: false,
          landVerified: false,
          bankVerified: false,
        };
        await tx.farmerProfile.create({
          data: farmerProfile,
        });
      }

      return newUser;
    }
  );

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      farmerProfile: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
