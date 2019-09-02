
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';





export const Money = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div>
      <h1>Money Status</h1>
      <h3>Total money ==> 10,000</h3>
      <Button variant="primary" onClick={handleShow}>
        Generate Coins
      </Button>
      
      <Modal show={show} onHide={handleClose}  
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Coins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="numberofcoins">
              <Form.Control type="text" placeholder="Enter number of coins" />
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
