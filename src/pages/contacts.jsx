import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Snackbar, Alert, Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from 'next/router';
import { baseUrl } from '@/const/baseurl';
import CustomModal from '@/component/share/model';
import LocationDetector from '@/component/admin/location';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [openSnackbar, setOpenSnackbar] = useState(false); // For showing snackbar messages
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Severity for snackbar
  const [key,setKey] = useState("")
  const router = useRouter();
  const [open ,setOpen] = useState(false)

  const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage

  // Redirect to login if no token is available
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // Fetch contacts from the API
  const fetchContacts = async () => {
    if (!token) return;

    setLoading(true); // Set loading state while fetching data

    try {
      const response = await fetch(baseUrl + '/getContacts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();

      if (data.data) {
        setContacts(data.data); // Update contacts state
      }

    } catch (error) {
      setSnackbarMessage('Error fetching contacts');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  // Delete a contact
  const handleDelete = async (id) => {
    if (!token) return;

    setLoading(true); // Set loading state while deleting

    try {
      const response = await fetch(baseUrl+`/deleteContact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Filter out the deleted contact from the contacts list
        setContacts(contacts.filter(contact => contact.id !== id));
        setSnackbarMessage('Contact deleted successfully');
        setSnackbarSeverity('success');
        fetchContacts()
      } else {
        setSnackbarMessage('Failed to delete contact');
        setSnackbarSeverity('error');
      }

    } catch (error) {
      setSnackbarMessage('Error deleting contact');
      setSnackbarSeverity('error');
    } finally {
      setLoading(false); // Set loading state to false after the request
      setOpenSnackbar(true); // Open snackbar with message
    }
  };

  // Handle location view click
  const handleViewLocation = (location) => {
   setOpen(true)
  };

  // Fetch contacts when the token changes or the component mounts
  useEffect(() => {
    fetchContacts();
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Contacts</h1>

      {/* Loading Spinner */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <CircularProgress />
        </div>
      )}
     <CustomModal open={open} setOpen={setOpen} content={<LocationDetector key={key} latitude="20.593683" longitude="78.962883"/>}/>
      {/* Contacts Table */}
      <Input fullWidth placeholder='Api key of google map to see loaction' type="text" onChange={(e)=>setKey(e.target.value)} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Message</strong></TableCell>
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>IpAddrees</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <TableRow key={contact.ID}>
                  <TableCell>{contact.Name}</TableCell>
                  <TableCell>{contact.Email}</TableCell>
                  <TableCell>{contact.Phone}</TableCell>
                  <TableCell>{contact.Message}</TableCell>
                  <TableCell>{contact.createdAt}</TableCell>
                  <TableCell>{contact.IpAdress}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewLocation(contact.location)}
                    >
                      <LocationOnIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(contact.ID)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  No contacts available
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

export default ContactsPage;
