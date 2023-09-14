import { unescapeString } from "../../../../utils";
import { prisma } from "../../common/prisma/prismaClient";
import { getUserByEmail, createNewUser, getUserByToken } from "../../users";
import { updateOne } from "../../../../core/db/common";

const bcrypt = require("bcryptjs");

async function loginWithEmailAndPassword(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (user === null) {
    return { error: { email: "No user registered with this email" } };
  }

  const auth = await prisma.auth.findFirst({
    where: { userId: user.id },
  });

  const encryptedPassword = auth?.encryptedPassword;

  if (encryptedPassword) {
    const isMatch = await bcrypt.compare(
      password,
      unescapeString(encryptedPassword)
    );
    if (isMatch) {
      const payload = {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePictureURL: user.profilePictureURL,
        role: user.role,
        createdAt: user.createdAt,
      };
      return { payload };
    }
  }
  return { error: { password: "Wrong password" } };
}

async function register(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  profilePictureURL?: string,
  role?: string,
  provider: string = "",
  accessToken: string = "",
  metadata: string = ""
) {
  const user = await getUserByEmail(email);
  if (user !== null) {
    return { error: { email: "User already exists" } };
  }

  const hashingPromise = new Promise<string>((resolve) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash);
      });
    });
  });

  const hash = await hashingPromise;

  const newUser = await createNewUser(
    email,
    hash,
    firstName,
    lastName,
    phone,
    profilePictureURL,
    role,
    provider,
    accessToken,
    metadata
  );

  return newUser;
}

async function resetPassword(token: string, password: string) {
  const user = await getUserByToken(token);
  if (!user) {
    return {
      error: {
        token:
          "Password reset token has expired. Please request a new password reset e-mail.",
      },
    };
  }

  const hashingPromise = new Promise<string>((resolve) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash);
      });
    });
  });

  const hash = await hashingPromise;

  const authRes = await prisma.auth.findFirst({
    where: { userId: user.id },
  });

  if (authRes?.id) {
    await updateOne("auth", authRes.id, {
      encrypted_password: hash,
      reset_token: "",
    });
  }
  const email = user.email;
  if (email) {
    return await getUserByEmail(email);
  }
  return null;
}

export { loginWithEmailAndPassword, register, resetPassword };
