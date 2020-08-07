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
        .then(function (answer) {
            switch (answer.action) {
                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Departments":
                    addDepartments();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "View Employees":
                    viewEmployees();
                    break;

                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRole();
                    break;

                case "Update Employee Roles":
                    updateRoles();
                    break;

            }
        })
}


// Function to Add Employee
function addEmployee() {

}

// Function to Add Departments
function addDepartments(){

}

// Function to Add Role
function addRole(){

}

// Function to View Employees
function viewEmployees(){

}

// Function to View Departments
function viewDepartments(){

}

// Function to View Roles
function viewRole(){

}

// Function to Update Employee Roles
function updateRoles(){
    
}