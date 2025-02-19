import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/sign_in`, {
    user: { email, password },
  });
  localStorage.setItem("token", response.headers.authorization);
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  await axios.post(`${API_URL}/users`, {
    user: { email, password, first_name: firstName, last_name: lastName },
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};
