const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//create a connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_db'
})

//connects sql and database
connection.connect(function (err) {
    if (err) throw err;
    options();
})

function options() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome To your Employee database! What will you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add department",
                "add a role",
                "add employee",
                "update employee role",
                "exit"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "view all departments":
                    viewDepartments();
                    break;
                case "view all roles":
                    viewRoles();
                    break;
                case "view all employees":
                    viewEmployees();
                    break;
                case "add department":
                    addDepartment();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add employee":
                    addEmployee();
                    break;
                case "update employee role":
                    updateRole();
                    break;
                case "exit":
                    exitApp();
                    break;
                default:
                    break;
            }
        })
};


//view all departments 
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Departments:", res);
        options()
    })

}

//view all roles
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Roles:", res);
    })
}

//view all employees
function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("All Employees:", res);
    })
}

//add department
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "newDepartment",
                type: "input",
                message: "Department Name?"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.newDepartment
                });
            var query = "SELECT * FROM department";
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("Department has been added!!");
                console.table("All Departments:", res);
                options();
            })
        })
};

// add a role
function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "new_role",
                    type: "input",
                    message: "What role would you like to add?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "New role salary(Enter a number)"
                },
                {
                    name: "Department",
                    type: "list",
                    choices: function () {
                        var deptArry = [];
                        for (let i = 0; i < res.length; i++) {
                            deptArry.push(res[i].name);
                        }
                        return deptArry;
                    },
                }
            ]).then(function (answer) {
                let department_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].name == answer.Department) {
                        department_id = res[a].id;
                    }
                }
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: department_id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("New role has been added");
                        console.table("All Roles:", res);
                        options();
                    })
            })
    })
};

// add employee
function addEmployee() {
    connection.query("SELECT  * FROM role", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "Employees first name?",
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Employees last name?"
                },
                {
                    name: "manager_id",
                    type: "input",
                    message: "Employees manager ID?"
                },
                {
                    name: "role",
                    type: "list",
                    choices: function () {
                        var roleArry = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArry.push(res[i].title);
                        }
                        return roleArry;
                    },
                    message: "Employees role?"
                }
            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Employee has been Added!");
                        options();
                    })
            })
    })
};

//update employee role
function updateRole() {

};

//delete an employee
function deleteEmployee() {

};

//exit
function exitApp() {
    connection.end();

};