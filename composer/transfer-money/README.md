# deakin coin

You can test the business network definition against the embedded runtime that stores the state of 'the blockchain' in-memory in a Node.js process. This embedded runtime is very useful for unit testing, as it allows you to focus on testing the business logic rather than configuring an entire Fabric.

## Deploy the Business Network Archive on Hyperledger Composer running locally
Use the following command to install the network:
```bash
./commands.sh
```
Deploying a business network to the Hyperledger Fabric requires the Hyperledger Composer chaincode to be installed on the peer, then the business network archive (`.bna`) must be sent to the peer, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding.

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
