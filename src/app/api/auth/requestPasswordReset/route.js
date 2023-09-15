import { NextResponse } from "next/server";
import { rootURL } from "../../config";
import { prisma } from "../../lib/prisma";
// import emailTrigger from "../../modules/emails/emailTrigger";
import { getUserByEmail } from "../../../../core/db/users";
const { v4: uuidv4 } = require("uuid");

export async function reset(req, res) {
  console.log("requestResetPassword");
  const res = NextResponse;
  // Form validation
  if (!req.body) {
    return res.json({}, { status: 500 });
  }

  const { email } = req.body;
  console.log(email);

  const user = await getUserByEmail(email);

  if (user) {
    console.log("Password reset request for user ", user);
    const email = user.email;
    const token = uuidv4();
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token },
    });
    const resetURL = `${rootURL}reset?token=${token}`;

    // emailTrigger.resetPasswordRequested(email, resetURL, user.id);
  }

  return res.json({ success: true }, { status: 200 });
}
