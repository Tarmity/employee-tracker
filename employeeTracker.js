// Varibles =================================================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require('chalk');
const logo = require('asciiart-logo');
const config = require('./package.json');


// Establish connection with MySQL ===========================================================
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_DB",
});

console.log(
    logo({
        name: 'Employee Tracker',
        font: 'Speed',
        lineChars: 18,
        padding: 2,
        margin: 3,
        borderColor: 'bold-white',
        logoColor: 'bold-blue',
        textColor: 'green',
    })
        .render()
);

connection.connect((err) => {
    if (err) throw err;
    // console.log("Connected as ID " + connection.threadId);
    init();
});


// Function that asks the inital Question ====================================================
function init() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Veiw All staff/Roles and Departments",
                "Veiw Employee/Company Details",
                "Add Employee/Company Information",
                "Update Employee Roles",
                "Delete Employee/Company Details",
                "Exit Application",
            ],
        })

        // Then promise with a switch statement to follow on for the inital Question
        .then(function (answer) {
            switch (answer.action) {
                case "Veiw All staff/Roles and Departments":
                    joinedTables(); // Function Done
                    break;

                case "Veiw Employee/Company Details":
                    viewEmployeeDetails(); // Function Done
                    break;

                case "Add Employee/Company Information":
                    addInformation(); // Function Done
                    break;

                case "Update Employee Roles":
                    updateRoles(); // Function Done
                    break;

                case "Delete Employee/Company Details":
                    deleteEmployeeDetails();
                    break;

                case "Exit Application":
                    process.exit(); //Function Done
                    break;
            }
        });
};

// Function to View Employee Details ============================================================= How to get rid of the index coloum on the table.

function viewEmployeeDetails() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please select what you would like to view",
            choices: [
                "View Employees",
                "View Departments",
                "View Roles",
                "Return to main MENU",
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Employees":
                    viewEmployees(); //Function Done
                    break;

                case "View Departments":
                    viewDepartments(); //Function Done
                    break;

                case "View Roles":
                    viewRole(); //Function Done
                    break;

                case "Return to main MENU":
                    init(); //Function Done
                    break;
            }
        });
};

// Function to add Employee/Company Information ==================================================

function addInformation() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please select where you would like to add new Information",
            choices: [
                "Add New Employee",
                "Add New Department",
                "Add New Role",
                "Return to main MENU",
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add New Employee":
                    addEmployee();
                    break;

                case "Add New Department":
                    addDepartments(); //Function Done
                    break;

                case "Add New Role":
                    addRole(); //Function Done
                    break;

                case "Return to main MENU":
                    init(); //Function Done
                    break;
            }
        });
};

// Function to Add Employee ====================================================================== 
function addEmployee() {
    // query the role table
    let roleQuery = `SELECT * FROM employee_db.role;`;
    // exe -- give you a list of roles
    let roleTitles = [];
    connection.query(roleQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            roleTitles.push({name:res[i].title, value:res[i].id});
        }    
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "please enter new employee's first name",
                    name: "first_name",
                },
                {
                    type: "input",
                    message: "Please Enter new employee's last name",
                    name: "last_name",
                },
                {
                    name: "role",
                    type: "list",
                    message: "What role is the new employee doing?",
                    choices: roleTitles,
                },
            ])
            .then(function (answer) {
                //console.log(answer)
                const sqlAddEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES(?, ?, ?, ?)`;
                connection.query(sqlAddEmployee, [answer.first_name, answer.last_name, answer.role, 3], (err, res) => {
                    if (err) throw err;
                    console.log("SuccessFul!");
                    init()
                })

            });
    });	    
};

// // Function to Add Departments =============================================================================
function addDepartments() {
    inquirer
        .prompt([
            {
                type: "input",
                message:
                    "What is the new Deparments ID number? (please do not use an ID already taken) ",
                name: "id",
            },
            {
                type: "input",
                message: "What is your new Department called?",
                name: "name",
            },
        ])
        .then(function (answer) {
            const sqlAddDepartment = `INSERT INTO department (id, name) VALUES ( ? , ?)`;
            connection.query(
                sqlAddDepartment,
                [answer.id, answer.name],
                (err, res) => {
                    if (err) throw err;
                    console.log("Successful");
                    init();
                }
            );
        });
};

// // Function to Add Role =======================================================================================
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message:
                    "What is the new Deparments ID number? (please do not use an ID already taken) ",
                name: "id",
            },
            {
                type: "input",
                message: "What is the Title for the new role going to be?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary for the new role?",
                name: "salary",
            },
            {
                type: "input",
                message: "What is your new Department id number for the new role?",
                name: "department_id",
            },
        ])
        .then(function (answer) {
            const sqlAddRole = `INSERT INTO role (id, title, salary, department_id ) VALUES ( ?, ?, ?, ?)`;
            connection.query(
                sqlAddRole,
                [answer.id, answer.title, answer.salary, answer.department_id], (err, res) => {
                    if (err) throw err;
                    console.log("Successful");
                    init();
                }
            );
        });
};

// Function to  delete Employees and company Details ==============================================================
function deleteEmployeeDetails() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Please select what Information you would like to delete",
            choices: [
                "Delete Employee",
                "Delete Department",
                "Delete Role",
                "Return to main MENU",
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Delete Employee":
                    deleteEmployee();
                    break;

                case "Delete Department":
                    deleteDepartments();
                    break;

                case "Delete Role":
                    deleteRole();
                    break;

                case "Return to main MENU":
                    init(); //Function Done
                    break;
            }
        });
};

// Function to delete Employee =============================================================================================
function deleteEmployee() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "Please enter the ID number of the employee you would like to delete"
        })
        .then(function (answer) {
            const sqlDeleteEmp = `DELETE FROM employee WHERE id = ?`;
            connection.query(sqlDeleteEmp, [answer.id], (err, res) => {
                if (err) throw err;
                console.log("Successfull")
                init()
            })
        })
};

// Function to delete Department============================================================================================
function deleteDepartments() {
    // query the Departments table
    let departQuery = `SELECT * FROM employee_db.department;`
    // exe -- give you a list of roles
    let departName = [];
    connection.query(departQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            departName.push({ name: res[i].name, value: res[i].id });
        }
        inquirer
            .prompt({
                name: "name",
                type: "list",
                message: "What department would you like to delete?",
                choices: departName,
            })
            .then(function (answer) {
                // console.log(answer)
                const sqlDeleteDepart = `DELETE FROM department WHERE id = ?`;
                connection.query(sqlDeleteDepart, [answer.name], (err, res) => {
                    if (err) throw err;
                    console.log("Successful!")
                    init()
                })
            })
    })
};

// Function to delete Role ==================================================================================================
function deleteRole() {
    // query the role table
    let roleQuery = `SELECT * FROM employee_db.role;`;
    // exe -- give you a list of roles
    let roleTitles = [];
    connection.query(roleQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            roleTitles.push({ name: res[i].title, value: res[i].id });
        }
        // console.log(roleTitles)
        inquirer
            .prompt({

                name: "title",
                type: "list",
                message: "What role would you like to delete?",
                choices: roleTitles,
            })
            .then(function (answer) {
                const sqlDelRole = `DELETE FROM role WHERE id = ?`;
                connection.query(sqlDelRole, [answer.title], (err, res) => {
                    if (err) throw err;
                    console.log("Successfull")
                    init()
                })
            })
    });
};

// Function to View all Employees ==========================================================================================
function viewEmployees() {
    const sqlViewEmployee = `SELECT id, first_name, last_name FROM employee_db.employee`;
    connection.query(sqlViewEmployee, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// Function to View all Departments ========================================================================================
function viewDepartments() {
    const sqlviewDepartment = `SELECT * FROM department`;
    connection.query(sqlviewDepartment, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// // Function to View all Roles ============================================================================================
function viewRole() {
    const sqlveiwRole = `SELECT * FROM role`;
    connection.query(sqlveiwRole, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
};

// // Function to Update Employee Roles =====================================================================================
function updateRoles() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the Employee's ID number",
                name: "id",
            },
            {
                type: "input",
                message: "What is the new role ID number?",
                name: "role_id",
            },
        ])
        .then(function (answer) {
            const sqlUpdaterole = `UPDATE employee SET role_id = ? WHERE id = ?`;
            connection.query(sqlUpdaterole, [answer.role_id, answer.id], (err, res) => {
                if (err) throw err;
                console.log("Successful!");
                joinedTables();
            });
        })
};

// Function to Join all the Tables together ================================================================================
async function joinedTables() {
    let query = `
            SELECT employee.id, first_name, last_name, title, salary, name AS department, manager_id FROM employee 
            LEFT JOIN role 
            ON employee.role_id = role.id LEFT JOIN department
            ON department.id = role.department_id
        `;

    await connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
};
