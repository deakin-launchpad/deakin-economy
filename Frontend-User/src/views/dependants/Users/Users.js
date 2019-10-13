import React, { useState } from 'react'
import UserCard from './UserCard'
import {Consumer} from '../../../contexts/common/context'
import 'bootstrap/dist/css/bootstrap.css';


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
            else{
            return (
            <div className="container">
              <h4 className="title">Users</h4>
                {user_list.map((user,k) => {
                     let amount=0;
                     let walletid=0;
                      let mycoins=0;
                   if(user.id == '1' || user.id=='2'){
                    return null;
                    }
                    wallet_list.map((wallet,key) => {
                      if(wallet.id=='w2'){
                        mycoins=wallet.amount;
                      }
                      const owner=wallet.owner.slice(36);
                      if(user.name == owner){
                        amount = wallet.amount;
                        walletid=wallet.id;
                      }
                    })  
                    return (<UserCard key={k} walletid={walletid} mycoins={mycoins} user={user}/>)
                })}
             </div>
            );
            }}
          }
        </Consumer>
  )
}
