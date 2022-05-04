import React, { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

const ContactItem = ({ cont }) => {
  const { contact } = useContext(Context);
  const navigate = useNavigate();

  const showContact = () => {
    contact.setContact(cont);
    navigate(`contacts/${cont.id}`);
  }

  return (
    <Col md={3} className={"mt-4"} >
      <Card
        style={{ cursor: 'pointer' }}
        onClick={showContact}
      >
        <Card.Header className="fw-bold">{cont.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            {cont.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col >
  );
};

export default ContactItem;