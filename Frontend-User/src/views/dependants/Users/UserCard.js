import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import Connection from '../Connection'


const UserCard = (props) =>{

  const [showCoinsModal, setShowCoinsModal] = React.useState(false);
  
  //close modals
  const CloseCoinsModal = () => setShowCoinsModal(false);
  
  //open modals
  const OpenCoinsModal = () => setShowCoinsModal(true);
  
  const [coins, setCoins] = useState("");

  const {user} = props;
  const {walletid} = props;
  const {mycoins} = props;

  //Give Coins
  const SubmitGiveCoins = (evt) => {
    if(mycoins<coins){
      alert("not enough coins!!");
    }
    else{
    evt.preventDefault();
    const data = {
      "$class": "org.example.mynetwork.TransferCoin",
      "sender": "w2",
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
  }
  
  return(
    <div>
      <div class="user-cards col-lg-3">
          <h6>User ID: {user.id}</h6>
          <h6>User Name: {user.name}</h6>
         <div className="row">
          <Button className="col-lg-2" variant="default" onClick={OpenCoinsModal}>
          <i class="material-icons">monetization_on</i>
          </Button>
          </div>
    </div>
   
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
</div>
);
};

export default UserCard;