import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Container, Form, FormControl, Navbar } from "react-bootstrap";
import { Context } from "..";
import EditContact from "./modals/EditContact";

const NavigationBar = () => {
  const { user, contact } = useContext(Context);
  const [findString, setFindString] = useState('');
  const [editContactVisible, setEditContactVisible] = useState(false);

  const logOut = () => {
    user.setIsAuth(false);
    contact.setLastPage(false);
    contact.setPage(1);
  }

  const onChangeFind = (e) => {
    let value = e.target.value;
    setFindString(value);
    if (!value) {
      contact.setFindString('');
    }
  }

  const find = () => {
    contact.setFindString(findString);
  }

  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">{user.name}</Navbar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={findString}
            onChange={onChangeFind}
          />
          <Button
            variant="outline-success"
            onClick={find}
          >
            Search
          </Button>
        </Form>
        <Button
          variant="outline-success"
          onClick={() => setEditContactVisible(true)}
        >
          Добавить контакт
        </Button>
        <Button
          variant="outline-success" onClick={logOut}>Выйти</Button>
      </Container>
      <EditContact edit={false} show={editContactVisible} onHide={() => setEditContactVisible(false)} editContact={{}} editInfo={[]} />
    </Navbar>
  );
};

export default observer(NavigationBar);