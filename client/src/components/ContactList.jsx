import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { Context } from "..";
import { getContacts } from "../http/contactAPI";
import ContactItem from "./ContactItem";

const ContactList = () => {
  const { user, contact } = useContext(Context);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let getParams =
    {
      params: {
        userId: user.id
      }
    }

    if (contact.findString) {
      getParams.params.title_like = contact.findString;
    }

    getContacts(getParams)
      .then(data => {
        if (data instanceof Array) {
          setContacts(data);
        }
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  }, [contact.findString, contact.refresh]);

  if (loading) {
    return <div
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" />
    </div >
  }

  if (contacts.length === 0) {
    return (
      <Container>
        <Alert className="mt-3" key="info" variant="info">
          Ещё нет контактов
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {contacts.map(contact => <ContactItem key={contact.id} cont={contact} />)}
      </Row>
    </Container>
  );
};

export default observer(ContactList);