'use client';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import api from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/vehicle'); 
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/signin', values);
      login(response.data.authToken, values.email);
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Toaster />
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
