import React from 'react'
import './cards.scss'
import Contacts from './contacts'
import Vaults from './vaults'

class UserCards extends React.Component{
    state = {
        contacts: [],
        vaults: []
      }
      componentDidMount() {
        fetch('http://104.248.176.80:3000/api/User')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
        })
        .catch(console.log)

        fetch('http://104.248.176.80:3000/api/Vault')
        .then(res => res.json())
        .then((data) => {
          this.setState({ vaults: data })
        })
        .catch(console.log)
      }
   
      render(){
        return (
            <div>
                    <Contacts contacts={this.state.contacts} vaults={this.state.vaults}/>
                   
            </div>
                    
        );
        }
      }

    export default UserCards;
    