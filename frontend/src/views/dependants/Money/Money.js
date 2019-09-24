
import React from 'react';
import {Consumer} from '../../../contexts/common/context'

export const Money = () => {

    var totalCoins =0;
  
  return (
    <div>
      <Consumer>
        {value => {
            const {wallet_list} = value;
            console. log ({wallet_list});
            wallet_list.map(wallet => (
              totalCoins = totalCoins + wallet.amount
            ))
            return (
              <React.Fragment>
                <h3>Money Status</h3>
                <h4>Total Coins: {totalCoins}</h4>
              </React.Fragment>
            );
          }
        }
      </Consumer>
    </div>  
  )
}
