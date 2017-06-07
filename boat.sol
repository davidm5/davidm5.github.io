pragma solidity ^0.4.2;

//import "./ConvertLib.sol";

// An attempt at an example contract.  It tracks who owns a boat
// and changes the owner only when approved by the previous owner.

contract Boat {

	address owner;   // Address of the account that currently owns this boat.
	bytes32 name;    // Name of the boat.


	// Not doing anything with events yet.
	//event Transfer(address from, address to, bytes32 name);

	//event NewBoat(address owner, bytes32 name);

	// The constuructor function
	function Boat(bytes32 boatName) {
		owner = msg.sender;
		name = boatName;
		//NewBoat(msg.sender, name);
	}

	// Kills off the contract; otherwise, contract is immortal and
	// stays on the network forever.  Per examples, this might be put
	// in a parent contract and inherited instead of spelled out explicitly here.
	function kill() {
		if (msg.sender == owner) suicide(owner); 
	}

	
	// Need a transfer ownership function here.  Should take in current owner and 
	// new owner.  If current owner parameter matches the stored current owner, 
	// then set owner to the new owner.  Otherwise needs to fail.
	function transferOwnership(address newOwner) returns(bool transferred) {
		if (owner != msg.sender) return false;
		owner = newOwner;
		//Transfer(msg.sender, newOwner, name);
		return true;

		//In real life we'd use a function modifier to check that the current
		//owner is the one sending the message to transfer ownership.
	}

	// After I get this to work, come back and revise.  I think if I declare
	// the variable as public, it automatically creates a getter (and setter).  A default
	// getter would be fine; a default setter wouldn't, because only the owner should be 
	// able to change some things.
	function getOwner() returns(address){
		return owner;
	}

	function getName() returns(bytes32 boatName) {
		return name;
	}

	function rename(bytes32 newName) returns(bool) {
		if (owner != msg.sender) return false;
		name = newName;
		return true;
	}
}
