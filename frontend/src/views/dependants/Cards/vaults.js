import React from 'react'

    const Vaults = ({ vaults }) => {
      return (
        <div>
          <center><h3>Vaults</h3></center>
          {vaults.map((vault) => (
            <div class="card">
              <div class="card-body">
              <h5 class="card-title">{vault.id}</h5>
                <h5 class="card-title">{vault.amount}</h5>
                <h5 class="card-title">{vault.owner}</h5>
               
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default Vaults