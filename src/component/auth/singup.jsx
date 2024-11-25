import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Container, InputAdornment, Card, CardContent, CardActions } from '@mui/material';
import { useRouter } from 'next/router';
import { baseUrl } from '@/const/baseurl';

const SignupComponent = ({ SingUpPage }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
    Phone: '',
    Role: 'user',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(baseUrl + '/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await response.json();
      SingUpPage(false); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirect to the login page
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Create Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* User Name */}
                <Grid item xs={12}>
                  <TextField
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    name="UserName"
                    value={formData.UserName}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </Grid>

                {/* Password */}
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    required
                    type="tel"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                    }}
                  />
                </Grid>

                {/* Error message */}
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" variant="body2" align="center">
                      {error}
                    </Typography>
                  </Grid>
                )}

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                  </Button>
                </Grid>

                {/* Already have an account link */}
                <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Button color="primary" onClick={() => SingUpPage(false)}>
                      Login
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions>
            {/* You could add other actions like a link to privacy policy, etc. */}
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default SignupComponent;
