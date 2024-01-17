import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { IcontextType, IUser } from "@/model/data";
import { getCurrentUser } from "@/lib/validate/appwrite/Apis";
export const startingUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imgUrl: "",
  details: "",
};
const startingState = {
  user: startingUser,
  Loading: false,
  setUser: () => {},
  Authenticated: false,
  setAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};
const authDetails = createContext<IcontextType>(startingState);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(startingUser);
  const [Loading, setLoading] = useState(false);
  const [Authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const checkAuthUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imgUrl: currentUser.imgUrl,
          details: currentUser.details,
        });
        setAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      navigate("/signin");
    }

    checkAuthUser();
  }, []);
  const value = {
    user,
    setUser,
    Loading,
    Authenticated,
    setAuthenticated,
    checkAuthUser,
  };
  return <authDetails.Provider value={value}>{children}</authDetails.Provider>;
};

export default AuthProvider;
export const userDetails = () => useContext(authDetails);
