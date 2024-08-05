const getMethod = require("./functions");
 
const yargs = require('yargs');
 

 // get accountholders data
yargs.command({
    command: "get",
    handler: function(){
        console.log("getting account holders data....")
        const customers_data=getMethod.readAccountHoldersData();
        console.log(customers_data);
    }
}); 

// add account holders's data in json file
yargs.command({
    command: "add",
    builder:{
        accountNumber:{
        demandOption: true, //whether we need to keep it optional or not
        type:"number",
        },
        name:{
            demandOption: true,
            type:"string",
        },
        balance:{
            demandOption: true,
            type:"number",
        },
    },
    handler: function(argv){
        console.log("adding new account......");
        getMethod.addNewAccounts(argv.accountNumber,argv.name,argv.balance);
    },
});


// remove account holders's data from json file
yargs.command({
    command: "remove",
    builder:{
        accountNumber:{
            demandOption: true,
            type:"number",
            },
            },
            handler: function(argv){
                console.log("removing account holder data...........");
                getMethod.removeAccountHoldersData(argv.accountNumber);
            },

});
yargs.parse();
