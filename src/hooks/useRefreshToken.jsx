import axios from "../api/axios";
import useAuth from "./useAuth";
function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/users/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        role: response.data.role,
        user:response.data.user
      };
    });
    return response?.data?.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
