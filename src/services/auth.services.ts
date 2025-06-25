import axios from "axios";

export const login = async (username: string): Promise<any> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_SERVER_URL}/auth/login`,
    { username }
  );

  return response;
};
