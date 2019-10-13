
import React, { useState } from 'react'
import {Consumer} from '../../../contexts/common/context'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import Connection from '../Connection'

export const Money = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [coins, setCoins] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = {
      "$class": "org.example.mynetwork.Wallet",
      "id": "w1",
      "amount": Number(admincoins)+Number(coins),
      "owner": "admin"
    }
    // Send this data to the Hyperledger Network
    Connection.update('Wallet', data, 'w1')
    .then((err) => {
      if (err) {
        console.log(err)
      }
    })
  }

    var admincoins=0
    var usercoins= 0;
    var totalCoins=0;
  
    return (
    <div>
      <Consumer>
        {value => {
            const {wallet_list} = value;
            console. log ({wallet_list});
            wallet_list.map(wallet => {
              if (wallet.id=="w1") {
                admincoins=wallet.amount;
                return null;
              }
              usercoins = usercoins + wallet.amount
            })
            totalCoins = admincoins + usercoins
            return (
              <React.Fragment>
                <h4 className="title">Coins Status</h4>
                <div className="row">
                <div className="col-lg-2 dash-grids">
                  <h6 className="grid-title">Admin Coins</h6>
                  <h5> {admincoins}</h5>
                  <i class="material-icons">monetization_on</i> 
                </div>
                <div className="col-lg-2 dash-grids">
                  <h6 className="grid-title">User Coins</h6>
                  <h5> {usercoins}</h5>
                  <i class="material-icons">attach_money</i> 
                </div>
                <div className="col-lg-2 dash-grids">
                  <h6 className="grid-title">Total Coins</h6>
                  <h5> {totalCoins}</h5>
                  <i class="material-icons">add</i> 
                </div>
              </div>
              </React.Fragment>
            );
          }
        }
        </Consumer>
          <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title>Create Coins</Modal.Title>
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
          <Button variant="primary" onClick={handleShow}>
            Create Coins
          </Button>
    </div>  
  )
}
