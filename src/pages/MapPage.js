import { Box } from '@mui/material';
import MapView from '../components/MapView';
import Filters from '../components/Filters';
import { useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { filterMarkersByDistance } from '../utils/mapUtils';
import { useMarkers } from '../hooks/useMarkers';

export default function MapPage() {
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const { getLocation } = useGeolocation();
  const { markers } = useMarkers();

  const handleFilterChange = async (filters) => {
    if (filters.distance) {
      try {
        const { latitude, longitude } = await getLocation();
        const filtered = filterMarkersByDistance(
          markers,
          latitude,
          longitude,
          filters.distance
        );
        setFilteredMarkers(
          filtered.filter(marker =>
            filters.languages.length === 0 ||
            marker.languages.some(lang => filters.languages.includes(lang))
          )
        );
      } catch (error) {
        console.error('Error applying distance filter:', error);
      }
    } else {
      setFilteredMarkers(
        markers.filter(marker =>
          filters.languages.length === 0 ||
          marker.languages.some(lang => filters.languages.includes(lang))
        )
      );
    }
  };

  return (
    <Box sx={{ position: 'relative', height: 'calc(100vh - 64px)' }}>
      <Filters onFilterChange={handleFilterChange} />
      <MapView markers={filteredMarkers} />
    </Box>
  );
}
