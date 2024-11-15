// UpdateProfileModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/ProfileModal.css"; // Reusing the same CSS file

const UpdateProfileModal = ({ show, handleClose, user, onSave }) => {
  const [username, setUsername] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleSave = () => {
    onSave({ name: username, email });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="profile-update-modal">
      <Modal.Header closeButton className="profile-update-modal-header">
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="profile-update-modal-body">
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="profile-update-modal-footer">
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProfileModal;
