import { useState } from "react";
import axios from "axios";

// Definición del hook personalizado
export const usePatch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = async (body, token) => {
    setLoading(true);
    try {
      const response = await axios.patch(url, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, patchData };
};