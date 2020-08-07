// Varibles =====================================================
const mysql = require("mysql");
const inquirer = require("inquirer");

// Establish connection with MySQL ==============================
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("successful");
    generalQuestion();
})

// Function that asks the inital Question =======================
function generalQuestion() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add Departments",
                "Add Role",
                "View Employees",
                "View Departments",
                "View Roles",
                "Update Employee Roles"
            ]
        })

// Then promise with a switch statement to follow on for the inital Question

}


// Function to Add Employee


// Function to Add Departments


// Function to Add Role


// Function to View Employees


// Function to View Departments


// Function to View Roles

// Function to Update Employee Roles