

// Used to hold the default Ethereum account that will pay for transactions.
var account;

// Set the abi definition for your contract
var abiDef = [{"constant":false,"inputs":[{"name":"newName","type":"bytes32"}],"name":"rename","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getName","outputs":[{"name":"boatName","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"name":"transferred","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"boatName","type":"bytes32"}],"payable":false,"type":"constructor"}]

// Instantiate a contract for transactions
var Boat = web3.eth.contract(abiDef);
var boat = Boat.at('0x2a1e664687271b0c6c04e8fe9fe940eff87f5750');

// Here's the actual application part of the code
window.App = {

  start: function() {
    var self = this;

    // Get the account.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      // We're going to assume the first account we retrieve is the one to use; safe enough for 
      // our purposes.    
      account = accs[0];

      // And for reference we'll dump out the list of accounts we found to the console.    
      console.log(accs);

      self.showInfo(); // Call the internal function to display the info about the boat.

    });
  },

  // Function to terminate the contract
  kill: function() {
    console.log("Terminating contract.");
    boat.kill( {from: account}).catch(function(e){
      console.log(e);
      });
  },

// This function just retrieves and displays the boat owner and name.
  showInfo: function () {
    var self = this;
  
    console.log("In new showInfo function");

    boat.getOwner.call(function(error, value){
        if(!error) {
            var owner_element = document.getElementById("boatowner");
            owner_element.innerHTML = value.valueOf();
        } else {
            console.error(error);
        }
    })

    boat.getName.call(function(error, value){
        if(!error) {
            var name_element = document.getElementById("boatname");
            name_element.innerHTML = web3.toAscii(value.valueOf());
        } else {
            console.error(error);
        }
    })
  },

  register: function() {
    //Dummy function placeholder; when implemented it should be a way to add another boat to the list.
  },


// Give the boat a new name.  Possible enhancement - only let the current owner change the name.
  rename: function() {
    var self = this;

    var newName = document.getElementById("newname").value;

    console.log("My new name is ", newName);  // see if passing multiple variables to log works

    boat.rename(newName, {from: account}, function(error){
        if(!error) {
            self.showInfo();           
        } else {
            console.error(error);
        }
    })
  },


  transfer: function() {
    //Dummy function placeholder - transfer owndership of the boat to another account
  },

};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask).  This is the part where we
  // establish a connection with an Ethereum node.	
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //  Our fallback is to use a local node.
    ////window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/52bYG6b7WXeqNBhfWcFH"));

  }

  App.start();
});


