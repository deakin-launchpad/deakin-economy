import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export class Token extends Asset {
      tokenid: string;
      owner: person;
   }
   export abstract class person extends Participant {
      participantKey: string;
      namee: string;
   }
   export class manager extends person {
      mgID: string;
      Designation: string;
   }
   export class employee extends person {
      empid: string;
      Designation: string;
   }
   export class passToken extends Transaction {
      token: Token;
      newOwner: person;
   }
// }
