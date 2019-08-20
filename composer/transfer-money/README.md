# transfer-money

Use the following command to generate the network archive:
```bash
npm install
```
The `composer archive create` command has created a file called `transfer-money.bna` in the `dist` folder.

You can test the business network definition against the embedded runtime that stores the state of 'the blockchain' in-memory in a Node.js process. This embedded runtime is very useful for unit testing, as it allows you to focus on testing the business logic rather than configuring an entire Fabric.
From your project working directory (`~/deakin-economy/composer`), run the command:
```
npm test
```



## Deploy the Business Network Archive on Hyperledger Composer running locally

Deploying a business network to the Hyperledger Fabric requires the Hyperledger Composer chaincode to be installed on the peer, then the business network archive (`.bna`) must be sent to the peer, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding.

Change directory to the `dist` folder containing `transfer-money.bna` file.

The `composer network install` command requires a PeerAdmin business network card (in this case one has been created and imported in advance), and the name of the business network. To install the composer runtime, run the following command:
```
cd dist
composer network install --card PeerAdmin@hlfv1 --archiveFile transfer-money.bna
```

The `composer network start` command requires a business network card, as well as the name of the admin identity for the business network, the file path of the `.bna` and the name of the file to be created ready to import as a business network card. To deploy the business network, run the following command:
```
composer network start --networkName transfer-money --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```

The `composer card import` command requires the filename specified in `composer network start` to create a card. To import the network administrator identity as a usable business network card, run the following command:
```
composer card import --file networkadmin.card
```

You can verify that the network has been deployed by typing:
```
composer network ping --card admin@transfer-money

To integrate with the deployed business network we can either use the Composer Node SDK or we can generate a REST API. To create the REST API we need to launch the `composer-rest-server` and tell it how to connect to our deployed business network. Now launch the server by changing directory to the project working directory and type:
```bash
cd ..
composer-rest-server
```

Answer the questions posed at startup. These allow the composer-rest-server to connect to Hyperledger Fabric and configure how the REST API is generated.
* Enter `admin@transfer-money` as the card name.
* Select `never use namespaces` when asked whether to use namespaces in the generated API.
* Select `No` when asked whether to secure the generated API.
* Select `No` when asked whether to enable authentication with Passport.
* Select `No` when asked if you want to enable the explorer test interface.
* Select `No` when asked if you want to enable dynamic logging.
* Select `Yes` when asked whether to enable event publication.
* Select `No` when asked whether to enable TLS security.

If the composer-rest-server started successfully you should see these output lines:
```
Discovering types from business network definition ...
Discovered types from business network definition
Generating schemas for all types in business network definition ...
Generated schemas for all types in business network definition
Adding schemas for all types to Loopback ...
Added schemas for all types to Loopback
Web server listening at: http://localhost:3000
Browse your REST API at http://localhost:3000/explorer
```

Open a web browser and navigate to http://localhost:3000/explorer

You should see the LoopBack API Explorer, allowing you to inspect and test the generated REST API. Follow the instructions to test Business Network Definition as mentioned above in the composer section.

