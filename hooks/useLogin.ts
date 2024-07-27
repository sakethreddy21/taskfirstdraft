import { useState } from 'react';
import axios from 'axios';

interface LoginResponse {
  status: boolean;
  errorMessage?: string;
  token?: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (usermail: string, password: string): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
console.log(usermail, password)
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8080/login', { usermail, password });
      
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setLoading(false);
      setError(err.response ? err.response.data.errorMessage : 'An error occurred');
      return null;
    }
  };

  return { login, loading, error };
};

export default useLogin;
