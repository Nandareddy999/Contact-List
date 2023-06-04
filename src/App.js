import React, { useState } from 'react';
import Login from './Components/Login';
import ContactList from './Components/ContactList';
import AddContact from './Components/AddContact';
import EditContact from './Components/EditContact';
import DeleteContact from './Components/DeleteContact';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [showDeleteContact, setShowDeleteContact] = useState(false);
  const [showContactList, setshowContactList] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('user_id');
  };

  const handleAddContact = () => {
    setShowAddContact(true);
    setShowEditContact(false);
    setShowDeleteContact(false);
    setshowContactList(false);
  };

  const handleEditContact = () => {
    setShowAddContact(false);
    setShowEditContact(true);
    setShowDeleteContact(false);
    setshowContactList(false);
  };

  const handleDeleteContact = () => {
    setShowAddContact(false);
    setShowEditContact(false);
    setShowDeleteContact(true);
    setshowContactList(false);
  };

  const handleContactList = () => {
    setShowAddContact(false);
    setShowEditContact(false);
    setShowDeleteContact(false);
    setshowContactList(true);
  };

  
  return (
    <div className="app">
      <h1 className="app-title">Contact Manager</h1>
      {loggedIn ? (
        <div>
          <nav className="navbar">
            <div>
              <button onClick={handleAddContact}>Add Contact</button>
              <button onClick={handleEditContact}>Edit Contact</button>
              <button onClick={handleDeleteContact}>Delete Contact</button>
              <button onClick={handleContactList}>Show Contact List</button>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </nav>
          <div className="app-content">
            {showAddContact && <AddContact />}
            {showEditContact && <EditContact />}
            {showDeleteContact && <DeleteContact />}
            {showContactList && <ContactList />}
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;