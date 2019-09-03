
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';

    const Contacts = ({ contacts,vaults }) => {
      const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
      return (
        <div>
          <center><h3>Users</h3></center>
          {contacts.map((contact,key) => (
          
                vaults.map((vault,k) => {
                  if (k !== key) {
                    return null;
                  }
                  return (
        
                  <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">UserID:{contact.id}</h5>
                    <h5 class="card-title">UserName:{contact.name}</h5>
                    <h5 class="card-title">UserAmount:{vault.amount}</h5>
                    
                    <Button variant="success" onClick={handleShow}>
        Give Coins
      </Button>
    <Modal show={show} onHide={handleClose}  
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Give Coins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="usercoins">
    <Form.Control type="text" placeholder="Enter amount" />
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
                  </div>
                );
                  })

        
          ))}
        </div>
      )
    };

    export default Contacts