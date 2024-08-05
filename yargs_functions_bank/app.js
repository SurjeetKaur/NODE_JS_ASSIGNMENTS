const getMethod = require("./functions");
 
const yargs = require('yargs');
 

 
yargs.command({
    command: "get",
    handler: function(){
        console.log("getting customer data....")
        const customers_data=getMethod.readCustomersData();
        console.log(customers_data);
    }
}); 

// mofidy or overeride data in json file
yargs.command({
    command: "add",
    builder:{
        name:{
        demandOption: true, //whether we need to keep it optional or not
        type:"string",
        },
        age:{
            demandOption: true,
            type:"number",
        },
        code:{
            demandOption: true,
            type:"string",
        },
    },
    handler: function(argv){
        console.log("checking conditions whether new customer's data should add or not..... ");
        getMethod.addCustomersData(argv.name,argv.age,argv.code);
    },
});


// remove data from json file
yargs.command({
    command: "remove",
    builder:{
        code:{
            demandOption: true,
            type:"string",
            },
            },
            handler: function(argv){
                console.log("checking conditions whether customer's data should remove or not..... ");
                getMethod.removeCustomersData(argv.code);
            },

});
yargs.parse();
