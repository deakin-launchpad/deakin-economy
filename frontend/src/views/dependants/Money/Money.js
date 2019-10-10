
import React from 'react';
import {Consumer} from '../../../contexts/common/context'

export const Money = () => {


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
                <h3>Coins Status</h3>
                <h4>Total Coins: {totalCoins}</h4>
                <h4>Admin Coins: {admincoins}</h4>
                <h4>User Coins: {usercoins}</h4>
              </React.Fragment>
            );
          }
        }
      </Consumer>
    </div>  
  )
}
