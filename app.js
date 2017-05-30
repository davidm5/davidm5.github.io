
// Import the page's CSS. Webpack will know what to do with it.


// Import libraries we need.



// Import our contract artifacts and turn them into usable abstractions.
////import boat_artifacts from '../../build/contracts/Boat.json'

// Boat is our usable abstraction, which we'll use through the code below.
////var Boat = contract(boat_artifacts);

var account;

////var boat; // Specfic instance of the Boat contract - a 'handle' to use to call the contract functions.






// obtain the abi definition for your contract
//var info = eth.getContractInfo(0x2a1e664687271b0c6c04e8fe9fe940eff87f5750)
var abiDef = [{"constant":false,"inputs":[{"name":"newName","type":"bytes32"}],"name":"rename","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getName","outputs":[{"name":"boatName","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"name":"transferred","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"boatName","type":"bytes32"}],"payable":false,"type":"constructor"}]

// instantiate a contract for transactions
var Boat = web3.eth.contract(abiDef);
var boat = Boat.at('0x2a1e664687271b0c6c04e8fe9fe940eff87f5750');

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.

window.App = {


  start: function() {
    var self = this;

    // Bootstrap the Boat abstraction for Use.
    ////Boat.setProvider(web3.currentProvider);

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

      account = accs[0];

	console.log(accs);

      // Get the particular deployed instance of 'Boat'
      ////Boat.deployed().then(function(instance){
      ////  boat = instance;
      ////  console.log("Boat in contructor: ", boat);
      ////}).then(function(){
      ////  self.showInfo();
      ////}).catch(function(e) {
      ////  console.log(e);
      ////});

      self.showInfo(); ////New code reploaces above block


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
            //return boat.getName.call();
           
        } else {
            console.error(error);
        }
    })

    boat.getName.call(function(error, value){
        if(!error) {
            var name_element = document.getElementById("boatname");
            name_element.innerHTML = web3.toAscii(value.valueOf());
            //return boat.getName.call();
           
        } else {
            console.error(error);
        }
    })



////    boat.getOwner.call().then(function(value) {
////      var owner_element = document.getElementById("boatowner");
////      owner_element.innerHTML = value.valueOf();
////      return boat.getName.call();
////    }).then(function(value){
////      var name_element = document.getElementById("boatname");
////      name_element.innerHTML = web3.toAscii(value.valueOf());
////    }).catch(function(e){
////      console.log(e);
////    });

  },

  register: function() {
    //Dummy function placeholder
  },



// Give the boat a new name.
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




////    boat.rename(newName, {from: account}).then(function(){
////      self.showInfo();
////    }).catch(function(e){
////      console.log(e);
////    });

  },


  transfer: function() {
    //Dummy function placeholder
  },

};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});


