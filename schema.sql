DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department VARCHAR(20) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(20) NOT NULL
);