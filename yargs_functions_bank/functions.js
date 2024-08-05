
const f1 = require('fs');

// Function to read customer data from file.json
function readAccountHoldersData() {
  if (f1.existsSync('file.json')) {
    const data_buffer = f1.readFileSync("file.json");
    const data_str = data_buffer.toString();
    const accountHolders = JSON.parse(data_str);
    return accountHolders;
  }
  else{
    const accounts=[];
    f1.writeFileSync("File.json", JSON.stringify(accounts));
    console.log('file.json has been created with an empty array.');
  } 
};


// Function to add customer data

function addNewAccounts(accountNumber, name, balance) {
  let accountHolders = readAccountHoldersData();
  const hasDuplicateRecord = accountHolders.find(account =>account.accountNumber ===accountNumber); //checking duplicate data
  
// if duplicate record exists
  if (hasDuplicateRecord) {  
    console.log("provided account holder already exists:" ,hasDuplicateRecord);
    } else
    {
      const newAccountHolder = {accountNumber,name,balance};
      accountHolders.push(newAccountHolder); // adding new object in file.json
      const data = JSON.stringify(accountHolders);
      f1.writeFileSync("file.json", data); //save new customer data in file.json
      console.log("New Account added successfully");
      return;
    }
};

  //function to remove customer data
  const removeAccountHoldersData= function(accountNumber){
    let accountHolders = readAccountHoldersData(); //read existing record in file through main read function 
    const originalLength=accountHolders.length;
    const filterAccountNumber = accountHolders.filter(account => account.accountNumber !== accountNumber);  // filter the record which does not match with provided code
    //console.log("filtered and original array length",filterAccountNumber.length,originalLength);
    //update data in file.json
    const filteredData = JSON.stringify(filterAccountNumber); // convert the filtered data to JSON string
    f1.writeFileSync("file.json", filteredData); // write the filtered data back to file.json
    
    // checking whether provided code data actually removed from file.json or not 
      if(filterAccountNumber.length===originalLength){
        console.log(`no matching account number found : ${accountNumber}`);
      }
      else{
        console.log(`Customer data with code ${accountNumber} removed successfully from file.json`);
      }

  };




module.exports = { readAccountHoldersData,addNewAccounts,removeAccountHoldersData };





