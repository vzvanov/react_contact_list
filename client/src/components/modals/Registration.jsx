import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import { registration } from "../../http/userAPI";

const Registration = ({ show, onHide }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" />
    </div >
  }

  const getRegistartion = async () => {
    setLoading(true);
    try {
      await registration({ name, email, password });
      onHide();
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Регистрация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <FloatingLabel
              controlId="floatingInput"
              label="Имя"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-2"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button variant="outline-dark" onClick={getRegistartion}>Регистрация</Button>
      </Modal.Footer>
    </Modal >
  );
};

export default Registration;