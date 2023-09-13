//@ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { User } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { setCurrentUser } from "../redux/actions";
import { websiteURL } from "../../settings/settings";

export default function useCurrentUser(): [
  user: User,
  token: string,
  loading: boolean
] {
  const { data: githubSession } = useSession();

  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUser(jwtToken = null) {
      try {
        const token = jwtToken ?? localStorage.getItem("jwtToken");
        if (token?.length === 0) {
          setUser(null);
          dispatch(setCurrentUser(null));
          setLoading(false);
          return;
        }
        setToken(token);
        axios.defaults.headers.common["Authorization"] = token;
        const userID = jwt_decode<{ id: string }>(token).id;

        const apiURL = `${await websiteURL()}/api/users/${userID}`;
        const response = await axios.get<{ user?: User; error: string }>(
          apiURL
        );
        if (response.data?.user) {
          setUser(response.data.user);
          dispatch(setCurrentUser(response.data.user));
        } else {
          setUser(null);
          dispatch(setCurrentUser(null));
        }
      } catch {
        setUser(null);
        dispatch(setCurrentUser(null));
      }

      setLoading(false);
    }

    if (githubSession) {
      console.log("github session");
      const { jwtToken } = githubSession;
      fetchCurrentUser(jwtToken);
    } else {
      console.log("no github session");
      fetchCurrentUser();
    }
  }, [githubSession]);

  return [user, token, loading];
}
