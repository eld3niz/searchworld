import { useState } from 'react';
import {
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
} from '@mui/material';
import { languages } from '../constants/languages';

export default function Filters({ onFilterChange }) {
  const [distance, setDistance] = useState(50);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleDistanceChange = (_, newValue) => {
    setDistance(newValue);
    onFilterChange({ distance: newValue, languages: selectedLanguages });
  };

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setSelectedLanguages(value);
    onFilterChange({ distance, languages: value });
  };

  return (
    <Paper sx={{ p: 2, position: 'absolute', top: 20, right: 20, zIndex: 1000, width: 300 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Distance (km)</Typography>
        <Slider
          value={distance}
          onChange={handleDistanceChange}
          min={0}
          max={500}
          valueLabelDisplay="auto"
        />
      </Box>

      <FormControl fullWidth>
        <InputLabel>Languages</InputLabel>
        <Select
          multiple
          value={selectedLanguages}
          onChange={handleLanguageChange}
          label="Languages"
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
