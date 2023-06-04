import React, { useState } from 'react';
import axios from 'axios';
import './EditContact.css';

function EditContact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setError('');
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setError('');
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    setError('');
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
    setError('');
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/contacts/edit', {
        first_name: firstName,
        last_name: lastName,
        mobile: mobile,
        user_id: userId
      });
      if (response.data.status === 'success') {
        alert('Contact updated successfully');
        setFirstName('');
        setLastName('');
        setMobile('');
        setUserId('');
      } else {
        setError(response.data.error || 'Contact could not be updated');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update contact. Please try again later.');
    }
  };

  return (
    <div className="edit-contact">
      <h2>Edit Contact</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleEdit}>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input type="text" id="mobile" value={mobile} onChange={handleMobileChange} />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input type="text" id="userId" value={userId} onChange={handleUserIdChange} />
        </div>
        <div className="form-buttons">
          <button type="submit">Edit Contact</button>
        </div>
      </form>
    </div>
  );
}

export default EditContact;
