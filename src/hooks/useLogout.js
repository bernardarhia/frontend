import axios from "../api/axios";

const useLogout = () => {
  const logout = async () => {
    try {
      const userLoggedOut = await axios("/users/logout", {
        withCredentials: true,
      });
   return userLoggedOut;
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};
export default useLogout;
