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
      choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Quit'],
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
        }
        if (choices.viewALL === 'View All Roles') {
            pool.query('SELECT * FROM role', (err: Error, res: QueryResult) => {
                if (err) {
                    console.error('There is no roles table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
             });
        }
            if (choices.viewALL === 'View All Departments') {
                pool.query('SELECT * FROM department', (err: Error, res: QueryResult) => {
                if (err) {
                    console.error('There is no departments table.', err.name);
                    return;
                }
                console.table(res.rows);
                performDuties();
            });
        }
            if (choices.viewALL === 'Quit') {
                process.exit(0);
            }

                 });
                };
                

performDuties();

app.use((_req, res) => {
        res.status(404).end();
                  });

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
                  });