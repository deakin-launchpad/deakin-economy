import React from 'react'
import './cards.scss'



const UserCard = (props) =>{
  const {user} = props;
  const {amount} = props;
  console.log(user)
 

  return(
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">User ID: {user.id}</h5>
    <h5 class="card-title">User Name: {user.name}</h5>
    <h5 class="card-title">Amount: {amount}</h5>
    </div>
    </div>
  );
};

export default UserCard;