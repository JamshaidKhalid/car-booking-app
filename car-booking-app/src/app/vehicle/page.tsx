'use client'
import { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, Grid, Paper, IconButton } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import api from '@/utils/api';
import { useProtectedRoute } from '@/hooks/useAuth';
import VehicleTable from '@/components/VehicleTable';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';

const VehicleSchema = Yup.object().shape({
  carModel: Yup.string().required('Required'),
  price: Yup.number().typeError('Price should be a number').positive('Price should be a positive number').required('Required'),
  phone: Yup.string().length(11, 'Must be exactly 11 digits').required('Required'),
  city: Yup.string().required('Required'),
  maxPictures: Yup.number().min(1).max(10).required('Required'),
  images: Yup.mixed().required('You need to provide at least one image'), 
});

export default function AddVehicle() {
  useProtectedRoute(); 

  const [vehicles, setVehicles] = useState([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicle', {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      setVehicles(response.data);
    } catch {
      toast.error('Failed to fetch vehicles');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, maxPictures: number) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length !== maxPictures) {
      toast.error(`Please select exactly ${maxPictures} images`);
      return;
    }

    setImageFiles(files);
  };

  const removeImage = (index: number) => {
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };

  const handleSubmit = async (values: any) => {
    if (imageFiles.length !== values.maxPictures) {
      toast.error(`You must upload exactly ${values.maxPictures} images.`);
      return;
    }

    const formData = new FormData();
    formData.append('carModel', values.carModel);
    formData.append('price', values.price.toString());
    formData.append('phone', values.phone);
    formData.append('city', values.city);
    formData.append('maxPictures', values.maxPictures.toString());
    imageFiles.forEach((file) => formData.append('images', file));

    try {
      await api.post('/vehicle', formData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Vehicle added successfully');
      setImageFiles([]);
      fetchVehicles();
    } catch {
      toast.error('Failed to add vehicle');
    }
  };

  return (
    <Container>
      <Toaster />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Vehicle
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Formik
            initialValues={{
              carModel: '',
              price: '',
              phone: '',
              city: '',
              maxPictures: '',
              images: null, 
            }}
            validationSchema={VehicleSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="carModel"
                      label="Car Model"
                      fullWidth
                      error={Boolean(touched.carModel && errors.carModel)}
                      helperText={touched.carModel && errors.carModel}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="price"
                      label="Price"
                      fullWidth
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="phone"
                      label="Phone"
                      fullWidth
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="maxPictures"
                      label="Max Pictures"
                      fullWidth
                      type="number"
                      error={Boolean(touched.maxPictures && errors.maxPictures)}
                      helperText={touched.maxPictures && errors.maxPictures}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      sx={{ mt: 2, padding: '6px 12px', fontSize: '0.875rem' }}
                    >
                      Choose Files
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={(e) => handleFileChange(e, Number(values.maxPictures))} // Convert to number here
                      />
                    </Button>
                    {errors.images && touched.images && <div style={{ color: 'red' }}>{errors.images}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                      {imageFiles.map((file, index) => (
                        <Box key={index} position="relative" width="80px" height="80px">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt="Selected"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => removeImage(index)}
                            sx={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              backgroundColor: 'white',
                            }}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" size="small" sx={{ mt: 3, padding: '6px 12px', fontSize: '0.875rem' }}>
                  Add Vehicle
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
      <VehicleTable vehicles={vehicles} />
    </Container>
  );
}
