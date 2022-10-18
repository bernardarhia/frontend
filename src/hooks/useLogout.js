import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const useLogout = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const userLoggedOut = await axios("/users/logout", {
        withCredentials: true,
      });
      if (userLoggedOut?.data) {
        setAuth(null);
        navigate("/login");
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};
export default useLogout;
