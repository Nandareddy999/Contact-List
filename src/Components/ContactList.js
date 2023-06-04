import React, { useState } from 'react';
import axios from 'axios';
import './ContactList.css';

const ContactList = () => {
  const [id, setId] = useState('');
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = () => {
    setIsLoading(true);
    axios
      .post('http://localhost:8080/contacts/get', { user_id: id })
      .then((response) => {
        setContacts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="contact-list">
      <h2>Show Contact List</h2>
      <form>
        <div className="form-group">
          <label htmlFor="id">Enter ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="button" onClick={fetchContacts}>
            Fetch Contacts
          </button>
        </div>
      </form>

      {!id && <p className="enter-id-message">Enter ID to show contacts</p>}

      {id && isLoading && <p>Loading...</p>}

      {id && !isLoading && (
        <>
          {contacts.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.user_id}>
                      <td>{contact.first_name}</td>
                      <td>{contact.last_name}</td>
                      <td>{contact.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-contacts">No contacts found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
