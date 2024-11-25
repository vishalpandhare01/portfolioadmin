import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { baseUrl } from '@/const/baseurl';

const UsersPage = () => {
  const [users, setUsers] = useState([]);  // Initialize users state
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [openSnackbar, setOpenSnackbar] = useState(false); // For showing snackbar messages
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Severity for snackbar
  const router = useRouter();

  const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage

  // Redirect to login if no token is available
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // Fetch users from the API
  const fetchUsers = async () => {
    if (!token) return;

    setLoading(true); // Set loading state while fetching data

    try {
      const response = await fetch(baseUrl + '/allUsers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();

      if (data.data) {
        setUsers(data.data); // Update users state
      }

    } catch (error) {
      setSnackbarMessage('Error fetching users');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    if (!token) return;

    setLoading(true); // Set loading state while deleting

    try {
      const response = await fetch(baseUrl + `/deleteUser/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Filter out the deleted user from the users list
        setUsers(users.filter(user => user.ID !== id));
        setSnackbarMessage('User deleted successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Failed to delete user');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }

    } catch (error) {
      setSnackbarMessage('Error deleting user');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  // Fetch users when the token changes or the component mounts
  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Users</h1>

      {/* Loading Spinner */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <CircularProgress />
        </div>
      )}

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.ID}>
                  <TableCell>{user.UserName}</TableCell>
                  <TableCell>{user.Phone}</TableCell>
                  <TableCell>{user.Role}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(user.ID)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                  No users available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UsersPage;
