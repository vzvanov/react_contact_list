import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Container, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Context } from "..";
import Registration from "../components/modals/Registration";
import { login } from "../http/userAPI";

const LoginPage = () => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationVisible, setRegistrationVisible] = useState(false);

  if (loading) {
    return <div
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" />
    </div >
  }

  const getAuthentification = async () => {
    setLoading(true);
    try {
      let data;
      data = await login(email, password);
      if (data instanceof Array && data.length === 1) {
        user.setUser(data[0]);
        user.setIsAuth(true);

      } else {
        alert('Не авторизован');
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 300 }}
    >
      <Card
        style={{ width: '25rem' }}
      >
        <Card.Body>
          <Card.Title className="text-center">Авторизация</Card.Title>
          <Form >
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
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
            <div className="d-flex justify-content-between">
              <Button variant="outline-dark" onClick={() => setRegistrationVisible(true)}>Регистрация</Button>
              <Button variant="outline-dark" onClick={getAuthentification}>Войти</Button>
            </div>
          </Form>
        </Card.Body>
        <Registration show={registrationVisible} onHide={() => setRegistrationVisible(false)} />
      </Card>
    </Container >
  );
};

export default observer(LoginPage);