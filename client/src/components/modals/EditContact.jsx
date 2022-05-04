
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { createContact, deleteContact, replaceContact, } from "../../http/contactAPI";
import { createInfo, deleteInfo, replaceInfo } from "../../http/infoAPI";

const EditContact = ({ show, onHide, editContact, editInfo, edit }) => {
  const { user, contact } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [removedInfo, setRemovedInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) return;
    if (!edit) return;
    let items = editInfo.map((item, index) => {
      item.number = index;
      return item;
    });
    setInfo(items);
    setTitle(editContact.title);
    setDescription(editContact.description);
  }, [show])

  if (loading) {
    return <div
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" />
    </div >
  }

  let titleForm = edit ? "Редактирование" : "Новый контакт";

  const addInfo = () => {
    let index = info.length;
    setInfo([...info, { value: '', description: '', number: index }]);
  }

  const removeInfo = (number) => {
    let item = info[number];
    if (item.hasOwnProperty('id') === true || item.hasOwnProperty('userId') === true) {
      setRemovedInfo([...removedInfo, item.id]);
    }
    setInfo(info.filter(i => i.number !== number));
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
  }

  const saveContact = async () => {
    setLoading(true);
    let saveContact = {
      title,
      description,
      userId: user.id
    }
    let newContact;
    try {
      if (edit) {
        newContact = await replaceContact(editContact.id, saveContact);
      } else {
        newContact = await createContact(saveContact);
      }
      info.forEach(async (item) => {
        delete item.number;
        if (item.hasOwnProperty('id') === true || item.hasOwnProperty('userId') === true) {
          await replaceInfo(item.id, item);
        } else {
          item.userId = newContact.userId;
          item.contactId = newContact.id;
          await createInfo(item);
        }
      });
      removedInfo.forEach(async (id) => {
        await deleteInfo(id);
      });
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
    beforeClose();
    contact.setRefresh(Date.now());
  }

  const removeContact = async () => {
    setLoading(true);
    try {
      await deleteContact(editContact.id);
      navigate('/');
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  const beforeClose = () => {
    setTitle('');
    setDescription('');
    setInfo([]);
    setRemovedInfo([]);
    onHide();
  }

  let footerClassName = edit ? "d-flex justify-content-between" : "d-flex justify-content-end";

  return (
    <Modal
      show={show}
      onHide={beforeClose}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {titleForm}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            placeholder="Название контакта"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <Form.Control
            className="mt-3"
            placeholder="Описание контакта"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
          <Button
            className="mt-3"
            variant="outline-dark"
            onClick={addInfo}
          >
            Добавить информацию
          </Button>
          {info.map(i =>
            <Row className="mt-3" key={i.number}>
              <Col md={5}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={5}>
                <Form.Control
                  value={i.value}
                  onChange={(e) => changeInfo('value', e.target.value, i.number)}
                  placeholder="Введите значение свойства"
                />
              </Col>
              <Col md={2}>
                <Button variant="outline-danger" onClick={() => removeInfo(i.number)}>Удалить</Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className={footerClassName}>
        {edit ? <Button variant="outline-danger" onClick={removeContact}>Удалить контакт</Button> : ''}
        <Button variant="outline-success" onClick={saveContact}>Сохранить</Button>
      </Modal.Footer>
    </Modal >
  );
};

export default EditContact;