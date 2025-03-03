import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function performDuties(): void {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'viewALL',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'View All Roles', 'View All Departments', 'Quit'],
    },
    ])
    .then((choices) => {
        if (choices.viewALL === 'View All Employees') {
            pool.query('SELECT * FROM employee', (err: Error, res: QueryResult) => {
                if (err) {
                    console.error('There is no employee table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
            });
        } else if (choices.viewALL === 'Add Employee') {
            addEmployee();
        }
          else if (choices.viewALL === 'View All Roles') {
            pool.query('SELECT * FROM role', (err: Error, res: QueryResult) => {
                if (err) {
                    console.error('There is no roles table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
             });
        }
           else if (choices.viewALL === 'View All Departments') {
                pool.query('SELECT * FROM department', (err: Error, res: QueryResult) => {
                if (err) {
                    console.error('There is no departments table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
            });
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
        // console.log(answers.id, answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
        pool.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${answers.id}, '${answers.first_name}', '${answers.last_name}', ${answers.role_id}, ${answers.manager_id})`, (err: Error, _res: QueryResult) => {
            if (err) {
                console.error('Error adding employee:', err.name);
                return;
            }
            console.log('Employee added successfully.');
            performDuties();
    });
    });
};

                

performDuties();

app.use((_req, res) => {
        res.status(404).end();
                  });

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
                  });