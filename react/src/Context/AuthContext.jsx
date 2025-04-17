import { createContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();

  async function getUser() {
    try {
      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
