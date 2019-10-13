import React from 'react'
import {Consumer} from '../../../contexts/common/context'
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css'
import { Transactions } from './Transactions';

export const Home = () => {
  
  var usercoins =0;
  var admincoins=0;
  var totalusers = 0;
  var totalTransactions=0;

  return (
    <Consumer>
        {value => {
            const {wallet_list} = value;
            const {user_list} = value;
            const {transaction_list} = value;

              wallet_list.map(wallet => {
              if (wallet.id=="w1") {
                admincoins=wallet.amount;
                return null;
              }
              usercoins = usercoins + wallet.amount
              })

              user_list.map(user => {
              if(user.usertype == 'NORMALUSER'){
                totalusers = totalusers + 1;
              }
              })

            transaction_list.map(transaction => {
              totalTransactions=totalTransactions+1;
            })
            
            return (
              <div className="container">
                  <h4 className="title">Dashboard</h4>
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
                  <h6 className="grid-title">Users</h6>
                  <h5> {totalusers}</h5>
                  <i class="material-icons">people</i> 
                </div>
                <div className="col-lg-2 dash-grids">
                  <h6 className="grid-title">Transactions</h6>
                  <h5> {totalTransactions}</h5>
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
