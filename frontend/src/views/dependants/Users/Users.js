import React, { useState } from 'react'
import UserCard from './UserCard'
import {Consumer} from '../../../contexts/common/context'
import Connection from '../Connection'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';


export const Users = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  //add user and wallet
  const AddUser = (evt) => {
    evt.preventDefault();
    
    //create new user
    const UserData = {
      "$class": "org.example.mynetwork.User",
      "id": id,
      "name": name,
      "usertype": "NORMALUSER"
    }

     // Send this data to the Hyperledger Network
     Connection.create('User', UserData)
     .then((err) => {
       if (err) {
         console.log(err)
       }
     })

    //create user wallet
     const WalletData = {
      "$class": "org.example.mynetwork.Wallet",
      "id": "w"+id,
      "amount": 0,
      "owner": name
    }

     // Send this data to the Hyperledger Network
     Connection.create('Wallet', WalletData)
     .then((err) => {
       if (err) {
         console.log(err)
       }
     })
    }
  
  return (
  <div>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddUser}>
            <Form.Group controlId="userid">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" value={id} onChange={e => setId(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)}/>
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
      <div className="row">
        <Consumer>
          {value => {
            const {user_list} = value;
            const{wallet_list} = value;
            console.log(wallet_list)
            console.log(user_list)
            if(user_list === undefined || user_list.length === 0){
              return null;
            }
            else{
            return (
            <div className="container">
              <h4 className="title">Users</h4>
                {user_list.map((user,k) => {
                     let amount=0;
                     let walletid=0;
                   if(user.usertype == 'ADMIN'){
                    return null;
                    }
                    wallet_list.map((wallet,key) => {
                      const owner=wallet.owner.slice(36);
                      if(user.name == owner){
                        amount = wallet.amount;
                        walletid=wallet.id;
                      }
                    })  
                    return (<UserCard key={k} walletid={walletid} user={user} amount={amount}/>)
                })}
             </div>
            );
            }}
          }
        </Consumer>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>
      </div>
  )
}
