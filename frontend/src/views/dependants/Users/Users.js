import React, { useState } from 'react'
import UserCard from './UserCard'
import {Consumer} from '../../../contexts/common/context'
import Connection from './Connection'
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    const data = {
      "$class": "org.example.mynetwork.User",
      "id": id,
      "name": name,
      "usertype": "NORMALUSER"
    }

     // Send this data to the Hyperledger Network
     Connection.create('User', data)
     .then((err) => {
       if (err) {
         console.log(err)
       }
     })
}// end handle submit
  
  return (
  <div>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            if(wallet_list === undefined || wallet_list.length === 0){
              return null;
            }
            else{
            return (
              <React.Fragment>
                {user_list.map((user,k) => {
                     let amount=0;
                   if(user.usertype == 'ADMIN'){
                    return null;
                    }
                    wallet_list.map((wallet,key) => {
                     
                      const owner=wallet.owner.slice(36);
                 
                      if(user.name == owner){
                        amount = wallet.amount;
                      }
                    })  
                    return (<UserCard key={k} user={user} amount={amount}/>)
                })}
             
              </React.Fragment>
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
