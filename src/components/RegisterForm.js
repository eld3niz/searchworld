import { useState } from 'react';
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
  OutlinedInput,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { countries } from '../constants/countries';
import { languages } from '../constants/languages';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    country: '',
    languages: [],
    showOnMap: false
  });
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(formData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" mb={3}>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select
          name="country"
          value={formData.country}
          onChange={handleChange}
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
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          input={<OutlinedInput label="Languages" />}
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
            name="showOnMap"
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
        Register
      </Button>
    </Box>
  );
}
