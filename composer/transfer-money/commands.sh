#!/bin/bash
cd ..

./stopFabric.sh

./startFabric.sh

cd transfer-money

composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile transfer-money@0.0.13.bna

composer network start --networkName transfer-money --networkVersion 0.0.13 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer-rest-server -c admin@transfer-money -n never -u true -d y
