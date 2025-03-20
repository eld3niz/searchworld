import { Container } from '@mui/material';
import ProfileForm from '../components/ProfileForm';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container maxWidth="sm">
      <ProfileForm />
    </Container>
  );
}
