// Varibles =====================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");


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
    init();
})

// Function that asks the inital Question =======================
function init() {
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
    // // query the role table
    // let roleQuery = `SELECT * FROM employee_db.role;`;
    // // exe -- give you a list of roles
    // connection.query(roleQuery, function (err, res) {
    //     for (let i = 0; i < res.length; i++) {
    //         let title = res[i].title
    //         function getArray(item){
    //             let jobTitle = [title].join(" ");
    //             let newTitle = jobtitle.map(getArray);
    //         }
    //         // for each role, grab the title, and turn them into an array (use map function )
    //     }

    // })
    // once you have the title array, chuck it down there

    inquirer
        .prompt([
            {
                type:"input",
                message: "Please enter new employee's ID number"          
            },
            {
                type: "input",
                message: "please enter new employee's first name",
                name: "first_name"
            },
            {
                type: "input",
                message: "Please Enter new employee's last name",
                name: "last_name"
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
                    "Junior Full Stack Developer"   // need this to be a title Array 
                ]
            },
        ]);

//         .then(function (answer)  {
//     const role = answer.role;

//     // query for the id of the selected role
//     let roleQuery = `SELECT * from \`role\` WHERE \`title\` = ${role}`

//     // exe the query

//     // grab the result, and get the id -- now you have the role id ready to insert to your create employee statement

//     let query = `INSERT INTO \`employee_db\`.\`employee\` (\`first_name\`, \`last_name\`, \`role_id\`, \`manager_id\`) VALUES ('${answer.first_name}', '${answer.last.name}', '', '3');`

//     })
}

    

// // Function to Add Departments
// function addDepartments(){

// }

// // Function to Add Role
// function addRole(){

// }

// Function to View Employees
function viewEmployees(){
    connection.query((`SELECT * FROM employee`), (err, res) => {
        if (err) throw err;
        console.table(res);
        process.exit();
    })
 }

// Function to View Departments
function viewDepartments(){
        connection.query((`SELECT * FROM department`), (err, res) => {
            if (err) throw err;
            console.table(res);
            process.exit();
        })

}

// // Function to View Roles
function viewRole(){
    connection.query((`SELECT * FROM role`), (err, res) => {
        if (err) throw err;
        console.table(res);
        process.exit();
    })

}

// // Function to Update Employee Roles
// function updateRoles(){

// }
