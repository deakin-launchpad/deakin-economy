import React from 'react'
import UserCards from '../Cards/UserCard'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';

export const Users = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="row">
          <UserCards />
      </div>

        <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>
    <Modal show={show} onHide={handleClose}  
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="userid">
    <Form.Control type="text" placeholder="Enter id" />
  </Form.Group>
  <Form.Group controlId="username">
    <Form.Control type="text" placeholder="Enter name" />
  </Form.Group>
 
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
