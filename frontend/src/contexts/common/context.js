import React, { Component } from 'react';
const Context = React.createContext();

export class Provider extends Component{

    state = {
        user_list: [],
        wallet_list: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/User')
        .then(res => res.json())
        .then((data) => {
          this.setState({ user_list: data })
          
        })
        .catch(console.log)

        fetch('http://localhost:3000/api/Wallet')
        .then(res => res.json())
        .then((data) => {
          this.setState({ wallet_list: data })
          
        })
        .catch(console.log) 
      }
    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;

