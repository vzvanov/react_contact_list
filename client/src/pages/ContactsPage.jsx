import React from "react";
import ContactList from "../components/ContactList";
import NavigationBar from "../components/NavigationBar";

const ContactsPage = () => {
  return (
    <div>
      <NavigationBar />
      <ContactList />
    </div>
  );
};

export default ContactsPage;