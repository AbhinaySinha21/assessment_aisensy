import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const contactsPerPage = 10;
  const pageCount = Math.ceil(contacts.length / contactsPerPage);

  useEffect(() => {
    axios.get('http://localhost:3500/api/contacts').then((response) => {
      setContacts(response.data);
    });
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedContacts = contacts.slice(
    currentPage * contactsPerPage,
    (currentPage + 1) * contactsPerPage
  );

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {displayedContacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.contact} - {contact.email}
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default ContactList;
