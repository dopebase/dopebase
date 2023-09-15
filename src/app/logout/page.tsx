// @ts-nocheck
"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "../..//modules/auth/redux/actions";

import useCurrentUser from "../../modules/auth/hooks/useCurrentUser";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, token, loading] = useCurrentUser();
  const { data: githubSession } = useSession();

  useEffect(() => {
    if (!loading) {
      logout();
    }
  }, [loading]);

  const logout = async () => {
    if (githubSession) {
      signOut();
    } else {
      dispatch(logoutUser(dispatch, router));
    }
  };

  if (loading) {
    return <div />;
  }

  return null;
};

export default Logout;
