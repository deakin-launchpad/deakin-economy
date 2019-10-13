import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import Connection from '../Connection'


const UserCard = (props) =>{

  const [showUserModal, setShowUserModal] = React.useState(false);
  const [showCoinsModal, setShowCoinsModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  
  //close modals
  const CloseCoinsModal = () => setShowCoinsModal(false);
  const CloseUserModal = () => setShowUserModal(false);
  const CloseDeleteModal = () => setShowDeleteModal(false);
  
  //open modals
  const OpenCoinsModal = () => setShowCoinsModal(true);
  const OpenUserModal = () => setShowUserModal(true);
  const OpenDeleteModal = () => setShowDeleteModal(true);
  
  const [coins, setCoins] = useState("");
  const [username, setUsername] = useState("");

  const {user} = props;
  const {amount} = props;
  const {walletid} = props;
  //console.log(user)

  //Give Coins
  const SubmitGiveCoins = (evt) => {
    evt.preventDefault();
    const data = {
      "$class": "org.example.mynetwork.TransferCoin",
      "sender": "w1",
      "receiver": walletid,
      "amount": Number(coins)
    }
    // Send this data to the Hyperledger Network
    Connection.create('TransferCoin', data)
    .then((err) => {
      if (err) {
        console.log(err)
      }
    })
  }

//Update User
const SubmitUpdateUser = (evt) => {
  evt.preventDefault();
  
  const data = {
    "$class": "org.example.mynetwork.User",
    "id": Number(user.id),
    "name": username,
    "usertype": "NORMALUSER"
  }

  // Send this data to the Hyperledger Network
  Connection.update('User', data, user.id)
  .then((err) => {
    if (err) {
      console.log(err)
    }
  })
  }

//Delete User and Wallet
const SubmitDeleteUser = (evt) => {
  evt.preventDefault();
  
  // Delete User
  Connection.delele('User', user.id)
  .then((err) => {
    if (err) {
      console.log(err)
      
    }
  })

  // Delete User
  Connection.delele('Wallet', 'w'+user.id)
  .then((err) => {
    if (err) {
      console.log(err)
      
    }
  })
  }
  return(
    <div>
      <div class="user-cards col-lg-3">
          <h6>User ID: {user.id}</h6>
          <h6 class="card-title">Wallet Id: {walletid}</h6>
          <h6>User Name: {user.name}</h6>
          <h6 class="card-title">Coins: {amount}</h6> 
         <div className="row">
          <Button className="col-lg-2" variant="default" onClick={OpenCoinsModal}>
          <i class="material-icons">monetization_on</i>
          </Button>
     
          <Button className="col-lg-2" variant="default" onClick={OpenUserModal}>
          <i class="material-icons">edit</i>
          </Button>
          <Button className="col-lg-2" variant="default" onClick={OpenDeleteModal}>
          <i class="material-icons">delete</i>
          </Button>
          </div>
          
  
    </div>
    <Modal show={showDeleteModal} onHide={CloseDeleteModal} aria-labelledby="contained-modal-title-vcenter" centered>
        
    <Modal.Header closeButton>
      <Modal.Title>Delete User</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
    <Form onSubmit={SubmitDeleteUser}>
        <Form.Group controlId="username">
          <Form.Label>Do you want to delete user#{user.id}?</Form.Label>
   
        </Form.Group>
        <Button variant="secondary" onClick={CloseDeleteModal}>
          No
        </Button>
        <Button variant="success right" onClick={CloseDeleteModal} type="submit">
          Yes
        </Button>
      </Form>
    </Modal.Body>
    </Modal>
    <Modal show={showCoinsModal} onHide={CloseCoinsModal} aria-labelledby="contained-modal-title-vcenter" centered>
        
    <Modal.Header closeButton>
      <Modal.Title>Give Coins</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
      <Form onSubmit={SubmitGiveCoins}>
        <Form.Group controlId="username">
          <Form.Label>Enter Coins</Form.Label>
          <Form.Control type="text" value={coins} onChange={e => setCoins(e.target.value)}/>
        </Form.Group>
        <Button variant="secondary" onClick={CloseCoinsModal}>
          Close
        </Button>
        <Button variant="success right" onClick={CloseCoinsModal} type="submit">
          Submit
        </Button>
      </Form>
    </Modal.Body>
    </Modal>

    <Modal show={showUserModal} onHide={CloseUserModal} aria-labelledby="contained-modal-title-vcenter" centered>
        
    <Modal.Header closeButton>
      <Modal.Title>Update User</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
      <Form onSubmit={SubmitUpdateUser}>
        <Form.Group controlId="username">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Button variant="secondary" onClick={CloseUserModal}>
          Close
        </Button>
        <Button variant="success right" onClick={CloseUserModal} type="submit">
          Submit
        </Button>
      </Form>
    </Modal.Body>
  
  </Modal>
  
  
  </div>
  );
};

export default UserCard;