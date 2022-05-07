import React from "react";
import ContactList from "../components/ContactList";
import NavigationBar from "../components/NavigationBar";
import Pagination from "../components/Pagination";

const ContactsPage = () => {
  return (
    <div>
      <NavigationBar />
      <ContactList />
      <Pagination />
    </div>
  );
};

export default ContactsPage;