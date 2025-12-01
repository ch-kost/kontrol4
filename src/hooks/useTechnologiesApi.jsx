import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Mock fetch
    setTimeout(() => {
      setData([]); // Initial empty or from local
      setLoading(false);
    }, 1000);
  }, []);

  const addTechnology = async (tech) => {
    // Mock add
    setData(prev => [...prev, { ...tech, id: Date.now() }]);
  };

  return { data, loading, error, addTechnology };
}

export default useTechnologiesApi;