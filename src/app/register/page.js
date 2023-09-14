"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SignUpView } from "../../modules/auth/components/SignupView";
import useCurrentUser from "../../modules/auth/hooks/useCurrentUser";

const SignUp = (props) => {
  const [user, token, loading] = useCurrentUser();
  const router = useRouter();

  console.log("user", user);

  if (loading) {
    return <></>;
  }
  if (user) {
    // already logged in, so redirect
    console.log("already logged in, so redirect");
    router.push(".");
    return <></>;
  }
  return <SignUpView />;
};

export default SignUp;
