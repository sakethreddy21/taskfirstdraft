import { useState } from 'react';
import axios from 'axios';

interface RegisterResponse {
  status: boolean;
  errorMessage?: string;
}

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (usermail:string,username: string, password: string): Promise<RegisterResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<RegisterResponse>('http://localhost:8080/register', {usermail, username, password });
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setLoading(false);
      setError(err.response ? err.response.data.errorMessage : 'An error occurred');
      return null;
    }
  };

  return { register, loading, error };
};

export default useRegister;
