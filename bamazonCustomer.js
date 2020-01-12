var mysql = require("mysql");
var inquirer = require("inquirer");
var validate = true;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "F1r3Cr4ck3r",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      var item_id = results[i].item_id;
      var product_name = results[i].product_name;
      var department = results[i].department;
      var price = results[i].price;
      var stock_quantity = results[i].stock_quantity;
      console.log("--------------------");
      console.log("ID: " + item_id);
      console.log("Product: " + product_name);
      console.log("Department: " + department);
      console.log("Price: " + price);
      console.log("Quantity: " + stock_quantity);
    }
    console.log("--------------------");
    // connection.end();
    bamazonBuy();
  });
}

function bamazonBuy() {
  inquirer.prompt([

    {
      type: "input",
      name: "idNum",
      message: "Please enter the ID number of the item you wish to purchase"
    },

    {
      type: "input",
      name: "quantity",
      message: "Please enter the quantity of items you would like to purchase"
    }
  ])
  .then(function(product) {
    connection.query("SELECT * FROM products", function (err, result, fields) {
      if (err) throw err;

      for(var i = 0; i < result.length; i++) {

        var idNum = parseInt(product.idNum);
        var quantity = parseInt(product.quantity);
        if(idNum === result[i].item_id) {
          console.log("Checking quantity...");
          if(quantity <= result[i].stock_quantity) {
            console.log("Thank you for your purchase!");
            return stockDrop();
          }
          else {
            console.log("Sorry, we don't have enough. Try again.");
            return bamazonBuy();
          }
        }
      // else {
      //   console.log("Sorry, but that ID doesn't exist. Try again.");
      //   bamazonBuy();
      // }
      }
      console.log("Sorry, but that ID doesn't exist. Try again.")
      bamazonBuy();
    })
    })
}

function stockDrop() {

}