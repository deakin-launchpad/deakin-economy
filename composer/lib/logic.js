'use strict';

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.AddCoin} transaction - the trade to be processed
 * @transaction
 */


async function onDepositCoin(transaction) {
    
  
    var vault = transaction.vault
    vault.amount += transaction.amount
  
    return getAssetRegistry('org.example.mynetwork.Vault')
      .then(function (assetRegistry) {
        return assetRegistry.update(vault)
      })
      .then(function () {
        sendEvent("Transfer complete");
      })
  }
  function sendEvent(msg) {
    var coinEvent = getFactory().newEvent('org.example.mynetwork', 'TransactionCompleted')
    coinEvent.msg = msg
    emit(coinEvent)
  }


/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.PassCoin} t - the trade to be processed
 * @transaction
 */

 async function onPassingCoin(t){
    return getAssetRegistry('org.example.mynetwork.userVault')
   .then(function(assetRegistry){
     var factory = getFactory()
     var vaultid = t.receiver.userid + '' + t.vault.id
     var vaultAsset = factory.newResource('org.example.mynetwork', 'userVault', vaultid)
     vaultAsset.amount = t.amountSent
     vaultAsset.owner = t.receiver
     vaultAsset.ReceivedFrom = t.vault

     return assetRegistry.add(vaultAsset)
     })
  
}





 