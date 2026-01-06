import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");
export const getUserDetails = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null; 
};
export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) return true;
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (e) {
        return true;
    }
};
export const getUserRole = () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        return null;
    }
    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch (e) {
        localStorage.removeItem("token");
        return null;
    }
};
