import { User } from "@prisma/client";
import { prisma } from "../../common/prisma/prismaClient";
import { escapeObject } from "../../../../utils";

const Validator = require("validator");

const bcrypt = require("bcryptjs");

async function getUserByID(userID: string): Promise<User | null> {
  return prisma.user.findFirst({ where: { id: Validator.escape(userID) } });
}

async function getUserByToken(token: string): Promise<User | null> {
  if (token?.length == 0) {
    return null;
  }
  const auth = await prisma.auth.findFirst({
    where: { resetToken: Validator.escape(token) },
  });
  const userId = auth?.userId;
  if (userId) {
    return await prisma.user.findFirst({
      where: { id: userId },
    });
  }
  return null;
}

async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: Validator.escape(email) },
  });
  if (user) {
    return user;
  }
  return null;
}

async function createNewUser(
  email: string,
  encryptedPassword: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  profilePictureURL?: string,
  role?: string,
  provider: string = "",
  accessToken: string = "",
  metadata: string = ""
) {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString();

  const insertData = {
    email,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
    metadata,
    createdAt: dateStr,
    updatedAt: dateStr,
  };
  const user = await prisma.user.create({
    data: escapeObject(insertData),
  });
  const auth = await prisma.auth.create({
    data: {
      userId: user.id,
      encryptedPassword,
      providerType: provider ? provider : email ? "email" : "phone",
      accessToken,
      createdAt: dateStr,
      updatedAt: dateStr,
    },
  });
  return user;
}

export { getUserByID, getUserByEmail, createNewUser, getUserByToken };
