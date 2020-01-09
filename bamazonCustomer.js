var mysql = require("mysql");

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
    connection.end();
  });
}