
function onDepositCoin(transaction) {
  validateAmount(transaction.amount)

  var vault = transaction.vault
  vault.amount += transaction.amount

  var newTransaction = getFactory().newConcept('org.example.mynetwork', 'CoinTransaction')
  newTransaction.amount = transaction.amount
  newTransaction.type = "DEPOSIT"

  if (vault.transactions) {
    vault.transactions.push(newTransaction)
  } else {
    vault.transactions = [newTransaction]
  }

  return getAssetRegistry('org.example.mynetwork.Vault')
    .then(function (assetRegistry) {
      return assetRegistry.update(vault)
    })
    .then(function () {
      sendEvent("Transfer complete");
    })
}

function onWithdrawCoin(transaction) {
  validateAmount(transaction.amount)

  var vault = transaction.vault

  if (vault.amount < transaction.amount) {
    throw new Error('Insufficient fund')
  }

  vault.amount -= transaction.amount

  var newTransaction = getFactory().newConcept('org.example.mynetwork', 'CoinTransaction')
  newTransaction.amount = transaction.amount
  newTransaction.type = "WITHDRAW"

  if (vault.transactions) {
    vault.transactions.push(newTransaction)
  } else {
    vault.transactions = [newTransaction]
  }

  return getAssetRegistry('org.example.mynetwork.Vault')
    .then(function (assetRegistry) {
      return assetRegistry.update(vault)
    })
    .then(function () {
      sendEvent("Transfer complete");
    })
}

function onTransferCoin(transaction) {
  validateAmount(transaction.amount)

  if (transaction.sender.amount < transaction.amount) {
    throw new Error('Insufficient fund')
  }

  transaction.sender.amount -= transaction.amount
  transaction.receiver.amount += transaction.amount
  
  var sendTransaction = getFactory().newConcept('org.example.mynetwork', 'CoinTransaction')
  sendTransaction.amount = transaction.amount
  sendTransaction.type = "SEND"
  if (transaction.sender.transactions) {
    transaction.sender.transactions.push(sendTransaction)
  } else {
    transaction.sender.transactions = [sendTransaction]
  }
  var receiveTransaction = getFactory().newConcept('org.example.mynetwork', 'CoinTransaction')
  receiveTransaction.amount = transaction.amount
  receiveTransaction.type = "RECEIVE"
  if (transaction.receiver.transactions) {
    transaction.receiver.transactions.push(receiveTransaction)
  } else {
    transaction.receiver.transactions = [receiveTransaction]
  }
  

  // Chain style
  //
  // return getAssetRegistry('org.example.mynetwork.Vault')
  //   .then(function (assetRegistry) {
  //     return assetRegistry.update(transaction.sender)
  //   })
  //   .then(function () {
  //     return getAssetRegistry('org.example.mynetwork.Vault')
  //   })
  //   .then(function (assetRegistry) {
  //     return assetRegistry.update(transaction.receiver)
  //   })
   
  return getAssetRegistry('org.example.mynetwork.Vault')
    .then(function (assetRegistry) {
      return assetRegistry.updateAll([transaction.sender, transaction.receiver])
    })
    .then(function () {
      sendEvent("Transfer complete")
    })
}

function validateAmount(amount) {
  if (amount < 0) {
    throw new Error('Invalid amount')
  }
}

function sendEvent(msg) {
  var coinEvent = getFactory().newEvent('org.example.mynetwork', 'TransactionCompleted')
  coinEvent.msg = msg
  emit(coinEvent)
}




 