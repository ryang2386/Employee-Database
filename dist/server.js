import express from 'express';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';
import { Department } from './department.js';
import { Employee } from './employee.js';
import { Role } from './role.js';
await connectToDb();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// creating arrays to store data from the department, employee, and role tables
const department = [];
const employee = [];
const role = [];
// function to get data from the department table and store it in the department array
function departmentArray(department) {
    pool.query('SELECT * FROM department order by id ASC;', (err, res) => {
        if (err) {
            console.error('There are no departments.', err.name);
            return;
        }
        else if (department.length === 0) {
            for (const row of res.rows) {
                department.push(new Department(row.id, row.name));
            }
        }
        return department;
    });
}
;
// function to get data from the employee table and store it in the employee array
function employeeArray(employee) {
    pool.query('SELECT * FROM employee order by id ASC;', (err, res) => {
        if (err) {
            console.error('There are no employees.', err.name);
            return;
        }
        else if (employee.length === 0) {
            for (const row of res.rows) {
                employee.push(new Employee(row.id, row.first_name, row.last_name, row.title, row.department, row.salary, row.manager));
            }
        }
        return employee;
    });
}
;
// function to get data from the role table and store it in the role array
function roleArray(role) {
    pool.query('select * from role order by id ASC;', (err, res) => {
        if (err) {
            console.error('There are no roles.', err.name);
            return;
        }
        else if (role.length === 0) {
            for (const row of res.rows) {
                role.push(new Role(row.id, row.title, row.salary, row.department));
            }
        }
        return role;
    });
}
;
// function used to perform different duties based on user input
function performDuties() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'viewALL',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
        .then((choices) => {
        // statements on what to do based on user input
        if (choices.viewALL === 'View All Employees') {
            pool.query('select * from employee order by id ASC;', (err, res) => {
                if (err) {
                    console.error('There is no employee table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
            });
        }
        else if (choices.viewALL === 'Add Employee') {
            addEmployee();
        }
        else if (choices.viewALL === 'Update Employee Role') {
            updateEmployeeRole();
        }
        else if (choices.viewALL === 'View All Roles') {
            pool.query('select * from role order by id ASC;', (err, res) => {
                if (err) {
                    console.error('There is no roles table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
            });
        }
        else if (choices.viewALL === 'Add Role') {
            addRole();
        }
        else if (choices.viewALL === 'View All Departments') {
            pool.query('SELECT * FROM department order by id ASC;', (err, res) => {
                if (err) {
                    console.error('There is no departments table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
            });
        }
        else if (choices.viewALL === 'Add Department') {
            addDepartment();
        }
        else {
            process.exit(0);
        }
    });
}
;
// function to add an employee to the employee table
function addEmployee() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name:',
        },
        {
            type: 'list',
            name: 'title',
            message: `What is the employee's role?`,
            choices: role.map((role) => role.title),
        },
        {
            type: 'list',
            name: 'manager',
            message: `Who is the employee's manager?`,
            choices: ['Ryan Gayle', 'Kyra Davis', 'Derrick Jones', 'Shawn Booker'],
        },
    ])
        .then((answers) => {
        role.forEach((role) => {
            if (role.title === answers.title) {
                // adds employee to the employee table
                pool.query(`INSERT INTO employee (id, first_name, last_name, title, department, salary, manager) VALUES (${employee.length + 1}, '${answers.first_name}', '${answers.last_name}', '${answers.title}', '${role.department}', ${role.salary}, '${answers.manager}')`, (err, _res) => {
                    if (err) {
                        console.error('Error adding employee:', err.name);
                        return;
                    }
                    console.log('Employee added successfully.');
                    // adds employee to the employee array
                    const newEmployee = new Employee(employee.length + 1, answers.first_name, answers.last_name, answers.title, answers.title, employee.length + 1, answers.manager);
                    employee.push(newEmployee);
                    performDuties();
                });
            }
        });
    });
}
;
// function to add a department to the department table
function addDepartment() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter department name:',
        },
    ])
        .then((answers) => {
        // adds department to the department table
        pool.query(`INSERT INTO department (id, name) VALUES (${department.length + 1}, '${answers.department}')`, (err, _res) => {
            if (err) {
                console.error('Error adding department:', err.name);
                return;
            }
            console.log('Department added successfully.');
            // adds department to the department array
            const newDepartment = new Department(department.length + 1, answers.department);
            department.push(newDepartment);
            performDuties();
        });
    });
}
;
// function to add a role to the role table
function addRole() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'title',
            message: `What is the employee's role?`,
        },
        {
            type: 'input',
            name: 'salary',
            message: `Enter the employee's salary:`,
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?',
            choices: department.map((department) => department.name),
        },
    ])
        .then((answers) => {
        // adds role to the role table
        pool.query(`INSERT INTO role (id, title, salary, department) VALUES (${role.length + 1}, '${answers.title}', ${answers.salary}, '${answers.department}')`, (err, _res) => {
            if (err) {
                console.error('Error adding role:', err.name);
                return;
            }
            console.log('Role added successfully.');
            // adds role to the role array
            const newRole = new Role(role.length + 1, answers.title, answers.salary, answers.department);
            role.push(newRole);
            performDuties();
        });
    });
}
;
// function to update an employee's role
function updateEmployeeRole() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'employee',
            message: `Which employee's role would you like to update?`,
            choices: employee.map((employee) => `${employee.first_name} ${employee.last_name}`),
        },
        {
            type: 'list',
            name: 'title',
            message: `What is the employee's new role?`,
            choices: role.map((role) => role.title),
        },
    ])
        .then((answers) => {
        employee.forEach((employee) => {
            if (`${employee.first_name} ${employee.last_name}` === answers.employee) {
                // updates employee role in the employee table
                pool.query(`UPDATE employee SET title = '${answers.title}' WHERE id = ${employee.id}`, (err, _res) => {
                    if (err) {
                        console.error('Error updating employee role:', err.name);
                        return;
                    }
                    console.log('Employee role updated successfully.');
                    role.forEach((role) => {
                        if (role.title === answers.title) {
                            // updates employee's department and salary in the employee table to match the new role
                            pool.query(`UPDATE employee SET department = '${role.department}', salary = ${role.salary} WHERE id = ${employee.id}`, (err, _res) => {
                                if (err) {
                                    console.error('Error updating employee role:', err.name);
                                    return;
                                }
                                performDuties();
                            });
                        }
                    });
                });
            }
        });
    });
}
;
app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// adds data from the department, employee, and role tables to the department, employee, and role arrays
departmentArray(department);
employeeArray(employee);
roleArray(role);
// calls the performDuties function to start the app
performDuties();
