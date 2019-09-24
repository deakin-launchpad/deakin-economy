import React from 'react'
import UserCard from './UserCard'
import {Consumer} from '../../../contexts/common/context'
import { isBreakOrContinueStatement } from '../../../../node_modules/typescript/lib/typescript'

export const Users = () => {
  return (
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
  )
}
