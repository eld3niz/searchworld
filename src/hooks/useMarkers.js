import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export function useMarkers() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMarkers();
  }, []);

  const fetchMarkers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('show_on_map', true);

      if (error) throw error;
      setMarkers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { markers, loading, error, refreshMarkers: fetchMarkers };
}
