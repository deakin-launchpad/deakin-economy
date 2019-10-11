import React, { useState } from 'react'
import './cards.scss'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import Connection from '../Connection'


const UserCard = (props) =>{
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [coins, setCoins] = useState("");


  const {user} = props;
  const {amount} = props;
  const {walletid} = props;
  console.log(user)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    const data = {
      "$class": "org.example.mynetwork.Wallet",
      "id": "w5",
      "amount": coins,
      "owner": user.name
    }
    // Send this data to the Hyperledger Network
    Connection.create('Wallet', data)
    .then((err) => {
      if (err) {
        console.log(err)
      }
    })
}// end handle submit

 
  return(
    <div>
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">User ID: {user.id}</h5>
    <h5 class="card-title">User Name: {user.name}</h5>
    <h5 class="card-title">Amount: {amount}</h5>
    <h5 class="card-title">walletid: {walletid}</h5>
    <Button variant="primary" onClick={handleShow}>
    Give Coins
  </Button>
    </div>
    </div>
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        
    <Modal.Header closeButton>
      <Modal.Title>Give Coins</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Enter Coins</Form.Label>
          <Form.Control type="text" value={coins} onChange={e => setCoins(e.target.value)}/>
        </Form.Group>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success right" onClick={handleClose} type="submit">
          Submit
        </Button>
      </Form>
    </Modal.Body>
  
  </Modal>
  </div>
  );
};

export default UserCard;