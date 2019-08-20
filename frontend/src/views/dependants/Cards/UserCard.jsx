import React from 'react'
import './cards.scss'
import user from './user.ico'
import { Form } from 'react-bootstrap';

class UserCards extends React.Component{
    render(){
        return(
            <div>
                <div className="card">
        
                    <div className="card-content">
                        <h3>Insha Khowaja</h3>
                        <h4><i class="material-icons">attach_money</i>3000</h4>
                    </div>
                    
                    <div className="card-btn"><i class="material-icons" >add_circle</i></div>
                
                </div>
            </div>
        )

        } 
    }

    export default UserCards;
    