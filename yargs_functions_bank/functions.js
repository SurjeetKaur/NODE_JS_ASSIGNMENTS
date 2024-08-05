
const f1 = require('fs');

// Function to read customer data from file.json
function readCustomersData() {
  if (f1.existsSync('file.json')) {
      const data_buffer = f1.readFileSync("file.json");
      const data_str = data_buffer.toString();
      const customers = JSON.parse(data_str);
      return customers;
  }
  else{
   // const emptyData=[];
    ///f1.writeFileSync("File.json", JSON.stringify(emptyData));
    //console.log('file.json has been created with an empty array.');
    return []; //empty if file.json does not exist

  }
 
};


// Function to add customer data

function addCustomersData(name, age, code) {
  let customersDetails = readCustomersData();
  const hasDuplicateRecord = customersDetails.find(customer =>customer.code ===code); //checking duplicate data
  //console.log(hasDuplicateRecord);

  if (hasDuplicateRecord) {  
    console.log("provided customer data already exists in file:" ,hasDuplicateRecord);
    console.log("no new object will add");
    return;
    } else
    {
    const newCustomer = {name,age,code};
    customersDetails.push(newCustomer); // adding new object in file.json
    const data = JSON.stringify(customersDetails);
    f1.writeFileSync("file.json", data); //save new customer data in file.json
    console.log("Customer data added and saved successfully in file.json ");
    return;
  }
};

  //function to remove customer data
  const removeCustomersData= function(code){
    let customersDetails = readCustomersData(); //read existing record in file through main read function 
    const originalLength=customersDetails.length;
    const filterCode = customersDetails.filter(customer => customer.code !== code);  // filter the record which does not match with provided code

    console.log("filtered and original array length",filterCode.length,originalLength);
    //update data in file.json
    const filteredData = JSON.stringify(filterCode); // convert the filtered data to JSON string
    f1.writeFileSync("file.json", filteredData); // write the filtered data back to file.json
    
    // checking whether provided code data actually removed from file.json or not 
    if(filterCode.length===originalLength){
      //console.log("filtered and original array length",filterCode.length,originalLength);
      console.log(`no matching code found with provided code to remove: ${code}`);
    }
    else{
      console.log(`Customer data with code ${code} removed successfully from file.json`);
      console.log("updated customer data",JSON.parse(filteredData));
    }

  };




module.exports = { readCustomersData,addCustomersData,removeCustomersData };





