import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import EditContact from "../components/modals/EditContact";
import { getInfo } from "../http/infoAPI";

const ContactPage = () => {
  const { user, contact } = useContext(Context);
  const { id } = useParams();
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true);
  const [editContactVisible, setEditContactVisible] = useState(false);

  const title = contact.contact.title;

  useEffect(() => {
    let getParams =
    {
      params: {
        userId: user.id,
        contactId: id
      }
    }

    getInfo(getParams)
      .then(data => {
        if (data instanceof Array) {
          setInfo(data);
        }
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  }, [contact.refresh]);

  if (loading) {
    return <div
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" />
    </div >
  }

  return (
    <Row className="justify-content-center">
      <Col md={5} >
        <Card
          style={{ cursor: 'pointer' }}
          className="mt-3"
        >
          <Card.Header className="fw-bold">{title}</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {info.length === 0 ?
                <Alert className="mt-3" key="info" variant="info">
                  Информация отсутствует
                </Alert>
                : ''
              }
              {info.map((item, index) =>
                <ListGroup.Item key={index} >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.description}</div>
                    {item.value}
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="outline-dark" onClick={() => setEditContactVisible(true)}>Редактировать</Button>
          </Card.Footer>
        </Card>
      </Col>
      <EditContact edit={true} show={editContactVisible} onHide={() => setEditContactVisible(false)}
        editContact={contact.contact}
        editInfo={info}
      />
    </Row>
  );
};

export default observer(ContactPage);