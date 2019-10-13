import React from 'react'
import {Consumer} from '../../../contexts/common/context'
import Table from 'react-bootstrap/Table'
import TransactionList from './TransactionList'


export const Transactions = () => {

  return (
       <Table striped responsive bordered size="sm" className="col-lg-10">
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Sender Wallet</th>
                <th>Receiver Wallet</th>
                <th>Coins</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
            <Consumer>
              {value => {
                const {transaction_list} = value;
                
                return(
                 <React.Fragment>
                  {transaction_list.map((transaction,key) => {

                    const sender=transaction.sender.slice(38);
                    const receiver=transaction.receiver.slice(38);

                    if(sender=='w2' || receiver=='w2')
                    return (<TransactionList key={key} transaction={transaction}/>)
                  })
                  }
                  </React.Fragment>
                )
              }
              }
            </Consumer>
            </tbody>
        </Table> 
  )
}
