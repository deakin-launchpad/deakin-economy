import React from 'react'


const TransactionList = (props) =>{
  const {transaction} = props;
  const id=transaction.transactionId;
  const sender=transaction.sender.slice(38);
  const receiver=transaction.receiver.slice(38);
  const amount=transaction.amount;
  const date=transaction.timestamp.slice(0,10);
  const time=transaction.timestamp.slice(11,19);

  return (
         <tr>
                <td>{id}</td>
                <td>{sender}</td>
                <td>{receiver}</td>
                <td>{amount}</td>
                <td>{date}</td>
                <td>{time}</td>
          </tr>
        )
  }

export default TransactionList
