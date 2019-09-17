
function onDepositCoin(transaction) {
  validateAmount(transaction.amount)

  var wallet = transaction.wallet
  wallet.amount += transaction.amount

  var newTransaction = getFactory().newConcept('org.example.mynetwork', 'CoinTransaction')
  newTransaction.amount = transaction.amount
  newTransaction.type = "DEPOSIT"

  if (wallet.transactions) {
    wallet.transactions.push(newTransaction)
  } else {
    wallet.transactions = [newTransaction]
  }

  return getAssetRegistry('org.example.mynetwork.Wallet')
    .then(function (assetRegistry) {
      return assetRegistry.update(wallet)
    })
    .then(function () {
      sendEvent("Transfer complete");
    })
}

function onWithdrawCoin(transaction) {
  validateAmount(transaction.amount)

  var wallet = transaction.wallet

  if (wallet.amount < transaction.amount) {
    throw new Error('Insufficient fund')
  }

  wallet.amount -= transaction.amount

  var newTransaction = getFactory().newConcept('org.example.mynetwork', 'CoinTransaction')
  newTransaction.amount = transaction.amount
  newTransaction.type = "WITHDRAW"

  if (wallet.transactions) {
    wallet.transactions.push(newTransaction)
  } else {
    wallet.transactions = [newTransaction]
  }

  return getAssetRegistry('org.example.mynetwork.Wallet')
    .then(function (assetRegistry) {
      return assetRegistry.update(wallet)
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
  // return getAssetRegistry('org.example.mynetwork.Wallet')
  //   .then(function (assetRegistry) {
  //     return assetRegistry.update(transaction.sender)
  //   })
  //   .then(function () {
  //     return getAssetRegistry('org.example.mynetwork.Wallet')
  //   })
  //   .then(function (assetRegistry) {
  //     return assetRegistry.update(transaction.receiver)
  //   })
   
  return getAssetRegistry('org.example.mynetwork.Wallet')
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




 