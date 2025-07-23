// LoginPage.jsx
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Avatar,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import GroupsIcon from '@mui/icons-material/Groups';

export default function LoginPage() {
  return (
    <Box
      display="flex"
      height="100vh"
      sx={{ backgroundColor: '#f5f8fb' }}
    >
      {/* Left Section - Illustration */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 4 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="Office Setup"
          style={{ maxWidth: '80%', maxHeight: '80%' }}
        />
      </Box>

      {/* Right Section - Login */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            p: 4,
            width: '80%',
            maxWidth: 400,
            textAlign: 'center',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Avatar sx={{ bgcolor: '#3f51b5', mr: 1 }}>
              <GroupsIcon />
            </Avatar>
            <Typography variant="h6">Dashboard Login</Typography>
          </Box>

          <Typography color="error" fontSize={14} mb={1}>
            Wrong Password!!
          </Typography>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            WELCOME BACK
          </Typography>

          <Typography variant="body2" mb={3}>
            Give your best report today!
          </Typography>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            error
            helperText="* Username field cannot be empty"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'bold',
              bgcolor: '#3f51b5',
              '&:hover': {
                bgcolor: '#2c3e9e',
              },
            }}
          >
            🔓 Login to My Account
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
