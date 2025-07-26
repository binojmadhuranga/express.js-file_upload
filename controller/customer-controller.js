const e = require("express");
require('dotenv').config();
const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



const updateCustomer = (req, res) => {

    const { name, address, contact_number } = req.body;
    connection.query('UPDATE customer SET name = ?, address = ?, contact_number = ? WHERE id = ?', [name, address, contact_number, req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send("Error updating customer");
        }
        res.send("Customer updated successfully!");
    });
};


const deleteCustomer = (req, res) => {

    connection.query('DELETE FROM customer WHERE id = ?', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send("Error deleting customer");
        }
        res.send("Customer deleted successfully!");
    });
};

const getCustomer = (req, res) => {
    connection.query('SELECT * FROM customer', (error, results) => {
        if (error) {
            return res.status(500).send("Error fetching customer details");
        }
        res.send(results);
    });
};

const getCustomerByid = (req, res) => {
    connection.query('SELECT * FROM customer WHERE id = ?', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send("Error fetching customer details");
        }
        res.send(results);
    });
};


const createCustomer = (req, res) => {
    connection.query('INSERT INTO customer (name, address,  contact_number) VALUES (?, ?, ?)', [req.body.name, req.body.address, req.body.contact_number], (error, results) => {
        if (error) {
            return res.status(500).send("Error creating customer");
        }
        else {
            res.status(201).send("Customer created successfully!");
        }
    });
};


module.exports = {
    updateCustomer,
    deleteCustomer,
    getCustomer,
    getCustomerByid,
    createCustomer
};
