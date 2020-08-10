// Varibles =================================================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");

// Establish connection with MySQL ===========================================================
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_DB",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
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
                "Veiw Employee/Company Details",
                "Add Employee/Company Information",
                "Update Employee Roles",
                "Exit Application",
            ],
        })

        // Then promise with a switch statement to follow on for the inital Question
        .then(function (answer) {
            switch (answer.action) {
                case "Veiw Employee/Company Details":
                    viewEmployeeDetails();
                    break;

                case "Add Employee/Company Information":
                    addInformation();
                    break;

                case "Add Departments":
                    addDepartments(); //Function Done
                    break;

                case "Add Role":
                    addRole(); //Function Done
                    break;

                case "Update Employee Roles":
                    updateRoles();
                    break;

                case "Exit Application":
                    process.exit(); //Function Done
                    break;
            }
        });
}

// Function to View Employee Details =============================================================

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
            }
        });
}

// Function to add Employee/Company Information 

// Function to Add Employee ======================================================================
function addEmployee() {
    // query the role table
    let roleQuery = `SELECT * FROM employee_db.role;`;
    // exe -- give you a list of roles
    connection.query(roleQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            let title = res[i].title;
            function getArray(item) {
                let jobTitle = [title].join(" ");
                let newTitle = jobtitle.map(getArray);
            }
            // for each role, grab the title, and turn them into an array (use map function )
        }
    });
    //once you have the title array, chuck it down there

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
                choices: [
                    "General Manager",
                    "Manager",
                    "Software Engineer",
                    "Full Stack Developer",
                    "Junior Full Stack Developer", // need this to be a title Array
                ],
            },
        ])

        .then(function (answer) {
            // const role = answer.role;
            // // query for the id of the selected role
            // let roleQuery = `SELECT * from \`role\` WHERE \`title\` = ${role}`
            // // exe the query
            // // grab the result, and get the id -- now you have the role id ready to insert to your create employee statement
            // let query = `INSERT INTO \`employee_db\`.\`employee\` (\`first_name\`, \`last_name\`, \`role_id\`, \`manager_id\`) VALUES ('${answer.first_name}', '${answer.last.name}', '${role}', '3');`
        });
}

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
}

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
                [answer.id, answer.title, answer.salary, answer.department_id],
                (err, res) => {
                    if (err) throw err;
                    console.log("Successful");
                    init();
                }
            );
        });
}

// Function to View all Employees =================================================================================
function viewEmployees() {
    const sqlViewEmployee = `SELECT * FROM employee`;
    connection.query(sqlViewEmployee, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

// Function to View all Departments ===============================================================================
function viewDepartments() {
    const sqlviewDepartment = `SELECT * FROM department`;
    connection.query(sqlviewDepartment, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
// Function to view by individual Departments

// // Function to View all Roles ===================================================================================
function viewRole() {
    const sqlveiwRole = `SELECT * FROM role`;
    connection.query(sqlveiwRole, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

//Function to Veiw by individual roles ==============================================================================

// // Function to Update Employee Roles =============================================================================
// function updateRoles(){

// }
