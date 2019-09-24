import React from 'react'
import {Consumer} from '../../../contexts/common/context'

export const Home = () => {
  
  var totalCoins =0;
  var totalusers = 0;

  return (
    <Consumer>
        {value => {
            const {wallet_list} = value;
            const {user_list} = value;
            wallet_list.map(wallet => (
              totalCoins = totalCoins + wallet.amount
            ))
            user_list.map(user => {
              if(user.usertype == 'NORMALUSER'){
                totalusers = totalusers + 1;
              }
            })
            
            return (
              <React.Fragment>
                 <div className="home">
                    <h2>Total Coins</h2>
                    <span class="counter center">{totalCoins}</span>
                    <h2>Total Users</h2>
                    <span class="counter">{totalusers}</span>
                    <h2>Transactions</h2>
                    <span class="counter">0</span>
                </div>
              </React.Fragment>
            );
          }
        }
      </Consumer>
  )
}
