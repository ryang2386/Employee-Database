import express from 'express';
import { QueryResult } from 'pg';
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

const department: Department[] = [];
const employee: Employee[] = [];
const role: Role[] = [];

function performDuties(): void {
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
        if (choices.viewALL === 'View All Employees') {
            pool.query('select * from employee', (err: Error, res: QueryResult) => {
                if (err) {
                    console.error('There is no employee table.', err.name);
                    return;
                }
                console.table(res.rows);
                if (employee.length === 0) {
                    for (const row of res.rows) {
                        employee.push(new Employee(row.id, row.first_name, row.last_name, row.title, row.department, row.salary, row.manager));
                    }
                }
                // console.log(employee);
                performDuties();
            });
        } else if (choices.viewALL === 'Add Employee') {
            addEmployee();
        }
        else if (choices.viewALL === 'Update Employee Role') {
            updateEmployeeRole();
        }
          else if (choices.viewALL === 'View All Roles') {
            pool.query('select * from role order by id ASC;', (err: Error, res: QueryResult) => {
                if (err) {
                    console.error('There is no roles table.', err.name);
                    return;
                }
                console.table(res.rows);
                if (role.length === 0) {
                    for (const row of res.rows) {
                        role.push(new Role(row.id, row.title, row.salary, row.department));
                    }
                }
                // console.log(role);
                performDuties();
             });
        } else if (choices.viewALL === 'Add Role') { 
            addRole();
        }
           else if (choices.viewALL === 'View All Departments') {
                pool.query('SELECT * FROM department', (err: Error, res: QueryResult) => {
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
        } else if (choices.viewALL === 'Add Department') {
            addDepartment();
        } else 
         {
                process.exit(0);
            }

                 });
            };

function addEmployee(): void {
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
        pool.query(`INSERT INTO employee (id, first_name, last_name, title, department, salary, manager) VALUES (${employee.length+1}, '${answers.first_name}', '${answers.last_name}', '${answers.title}', '${answers.title}', ${employee.length}, '${answers.manager}')`, (err: Error, _res: QueryResult) => {
            if (err) {
                console.error('Error adding employee:', err.name);
                return;
            }
            console.log('Employee added successfully.');
            const newEmployee = new Employee(employee.length +1, answers.first_name, answers.last_name, answers.title, answers.title, employee.length+1, answers.manager);
            employee.push(newEmployee);
            performDuties();
        });
    });
};

function addDepartment(): void {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter department name:',
        },
    ])
        .then((answers) => {
            // console.log(department.length + 1);
            pool.query(`INSERT INTO department (id, name) VALUES (${department.length +1}, '${answers.department}')`, (err: Error, _res: QueryResult) => {
                if (err) {
                    console.error('Error adding department:', err.name);
                    return;
                }
                console.log('Department added successfully.');
                const newDepartment = new Department(department.length + 1, answers.department);
                department.push(newDepartment);
                performDuties();
            });
        });
    };

function addRole(): void {
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
        // console.log(answers.title, answers.salary, answers.department);
     pool.query(`INSERT INTO role (id, title, salary, department) VALUES (${role.length+1}, '${answers.title}', ${answers.salary}, '${answers.department}')`, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error adding role:', err.name);
            return;
        }
        console.log('Role added successfully.');
        const newRole = new Role(role.length + 1, answers.title, answers.salary, answers.department);
        role.push(newRole);
        performDuties();
    });
    });
};

function updateEmployeeRole(): void {
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
            pool.query(`UPDATE employee SET title = '${answers.title}' WHERE id = ${employee.id}`, (err: Error, _res: QueryResult) => {
                if (err) {
                    console.error('Error updating employee role:', err.name);
                    return;
                }
                console.log('Employee role updated successfully.');
                performDuties();
            });
        }
     }
)});
};


performDuties();

app.use((_req, res) => {
        res.status(404).end();
                  });

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
                  });