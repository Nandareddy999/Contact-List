import React, { useState } from 'react';
import axios from 'axios';
import './AddContact.css';

function AddContact() {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [mobile, setMobile] = useState('');
  const [user_id, setUser_id] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const contact = { first_name, last_name, mobile, user_id };
    axios.post('http://localhost:8080/contacts/update', contact)
      .then(() => {
        setSuccessMessage('Contact added successfully');
        setFirst_name('');
        setLast_name('');
        setMobile('');
        setUser_id('');
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage('Failed to add contact');
      });
  };

  return (
    <div className="add-contact">
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={first_name} onChange={(event) => setFirst_name(event.target.value)} />
        </div>
        <br/>
        <div>
          <label>Last Name:</label>
          <input type="text" value={last_name} onChange={(event) => setLast_name(event.target.value)} />
        </div>
        <br/>
        <div>
          <label>Mobile: </label>
              <input type="tel" value={mobile} onChange={(event) => setMobile(event.target.value)} />
        </div>
        <br/>
        <div>
          <label>User ID:</label>
          <input type="number" value={user_id} onChange={(event) => setUser_id(event.target.value)} />
        </div>
        <br/>
        <button type="submit">Add Contact</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
}

export default AddContact;
