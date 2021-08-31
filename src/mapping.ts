import { BigInt, log } from "@graphprotocol/graph-ts"
import { Task1, Approval, Transfer } from "../generated/Task1/Task1"
import { userBalance } from "../generated/schema"


export function handleTransfer(event: Transfer): void {
  let balance = userBalance.load(event.params.from.toHexString())
  if(!balance){
    balance = new userBalance(event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
    
    let tokenContract = Task1.bind(event.address);
    balance.balance = tokenContract.balanceOf(event.params.from);
    balance.owner = event.params.from;
    balance.save();
  }

}
