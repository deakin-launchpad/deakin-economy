import React from 'react'


const TransactionList = (props) =>{
  const {transaction} = props;
  const id=transaction.transactionId;
  const sender=transaction.sender.slice(38);
  const receiver=transaction.receiver.slice(38);
  const amount=transaction.amount;
  const timestamp=transaction.timestamp;

  return (

         <tr>
                <td>{id}</td>
                <td>{sender}</td>
                <td>{receiver}</td>
                <td>{amount}</td>
                <td>{timestamp}</td>
          </tr>
  )
}

export default TransactionList
