import { useState } from "react";
import axios from "axios";

// Definición del hook personalizado
export const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body, token = null) => {
    const headers = token ? {
      headers: {
        'Authorization': `Bearer ${token}`
      }
            
        } : {};
    setLoading(true);
    try {
      
        const response = await axios.post(url, body, headers);
        setData(response.data);
        setError(null);
        setData(response.data);
        setError(null);
      
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};
