import React, { useState } from 'react';
import axios from 'axios';
import './DeleteContact.css';

function DeleteContact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/contacts/delete', {
        first_name: firstName,
        last_name: lastName,
        mobile: mobile,
        user_id: userId
      });
      if (response.data.status === 'success') {
        setSuccess('Contact deleted successfully');
        setFirstName('');
        setLastName('');
        setMobile('');
        setUserId('');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to delete contact. Please try again later.');
    }
  };

  return (
    <div className="delete-contact">
      <h2>Delete Contact</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <form onSubmit={handleDelete}>
        <div className="form-group">
          <label htmlFor="firstName">First Name: </label>
          <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile: </label>
          <input type="text" id="mobile" value={mobile} onChange={handleMobileChange} />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User ID: </label>
          <input type="text" id="userId" value={userId} onChange={handleUserIdChange} />
        </div>
        <div className="form-buttons">
          <button type="submit">Delete Contact</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteContact;
