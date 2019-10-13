import React from 'react'
import {Consumer} from '../../../contexts/common/context'
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css'
import { Transactions } from './Transactions';

export const Home = () => {
  

  var mycoins=0;
  var totalusers = 0;
  var myTransactions=0;

  return (
    <Consumer>
        {value => {
            const {wallet_list} = value;
            const {user_list} = value;
            const {transaction_list} = value;

              wallet_list.map(wallet => {
              if (wallet.id=="w2") {
                mycoins=wallet.amount;
                return null;
              }
              })

              user_list.map(user => {
              if(user.usertype == 'NORMALUSER'){
                totalusers = totalusers + 1;
              }
              })

            transaction_list.map(transaction => {

              const sender=transaction.sender.slice(38);
              const receiver=transaction.receiver.slice(38);
              if(sender=='w2' || receiver=='w2')
              myTransactions=myTransactions+1;
            })
            
            return (
              <div className="container">
                  <h4 className="title">Dashboard</h4>
                <div className="row">
                <div className="col-lg-2 dash-grids">
                  <h6 className="grid-title">My Coins</h6>
                  <h5> {mycoins}</h5>
                  <i class="material-icons">attach_money</i> 
                </div>
                <div className="col-lg-2 dash-grids">
                  <h6 className="grid-title">Users</h6>
                  <h5> {totalusers-1}</h5>
                  <i class="material-icons">people</i> 
                </div>
                <div className="col-lg-2 dash-grids">
                  <h6 className="grid-title">My Transactions</h6>
                  <h5> {myTransactions}</h5>
                  <i class="material-icons">compare_arrows</i> 
                </div>
              </div>
              <Transactions/>
           </div>
            );
          }
        }
      </Consumer>
  )
}
