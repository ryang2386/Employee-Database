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
const department = [];
const employee = [];
const role = [];
function performDuties() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'viewALL',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'View All Roles', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
        .then((choices) => {
        if (choices.viewALL === 'View All Employees') {
            pool.query('SELECT * FROM employee', (err, res) => {
                if (err) {
                    console.error('There is no employee table.', err.name);
                    return;
                }
                console.table(res.rows);
                if (employee.length === 0) {
                    for (const row of res.rows) {
                        employee.push(new Employee(row.id, row.first_name, row.last_name, row.role_id, row.manager_id));
                    }
                }
                console.log(employee);
                performDuties();
            });
        }
        else if (choices.viewALL === 'Add Employee') {
            addEmployee();
        }
        else if (choices.viewALL === 'View All Roles') {
            pool.query('SELECT * FROM role', (err, res) => {
                if (err) {
                    console.error('There is no roles table.', err.name);
                    return;
                }
                console.table(res.rows);
                if (role.length === 0) {
                    for (const row of res.rows) {
                        role.push(new Role(row.id, row.title, row.salary, row.department_id));
                    }
                }
                console.log(role);
                performDuties();
            });
        }
        else if (choices.viewALL === 'View All Departments') {
            pool.query('SELECT * FROM department', (err, res) => {
                if (err) {
                    console.error('There is no departments table.', err.name);
                    return;
                }
                console.table(res.rows);
                if (department.length === 0) {
                    for (const row of res.rows) {
                        department.push(new Department(row.id, row.name));
                    }
                }
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
function addEmployee() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee id:',
        },
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
            type: 'input',
            name: 'role_id',
            message: 'Enter role id:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter manager id:',
        },
    ])
        .then((answers) => {
        pool.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${answers.id}, '${answers.first_name}', '${answers.last_name}', ${answers.role_id}, ${answers.manager_id})`, (err, _res) => {
            if (err) {
                console.error('Error adding employee:', err.name);
                return;
            }
            console.log('Employee added successfully.');
            performDuties();
        });
    });
}
;
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
        pool.query(`INSERT INTO department (name) VALUES ('${answers.department}')`, (err, _res) => {
            if (err) {
                console.error('Error adding department:', err.name);
                return;
            }
            console.log('Department added successfully.');
            performDuties();
        });
    });
}
;
performDuties();
app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
