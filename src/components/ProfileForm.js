import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { countries } from '../constants/countries';
import { languages } from '../constants/languages';
import { useGeolocation } from '../hooks/useGeolocation';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    languages: [],
    showOnMap: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, updateProfile } = useAuth();
  const { getLocation } = useGeolocation();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        country: user.country || '',
        languages: user.languages || [],
        showOnMap: user.show_on_map || false
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      let coordinates = {};
      if (formData.showOnMap) {
        coordinates = await getLocation();
      }
      
      await updateProfile({
        ...formData,
        ...coordinates
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" mb={3}>Edit Profile</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <TextField
        fullWidth
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        margin="normal"
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select
          value={formData.country}
          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
          required
        >
          {countries.map(country => (
            <MenuItem key={country} value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Languages</InputLabel>
        <Select
          multiple
          value={formData.languages}
          onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
        >
          {languages.map(language => (
            <MenuItem key={language} value={language}>{language}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.showOnMap}
            onChange={(e) => setFormData(prev => ({ ...prev, showOnMap: e.target.checked }))}
          />
        }
        label="Show me on the map"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
      >
        Save Changes
      </Button>
    </Box>
  );
}
