ALTER TABLE employee ADD COLUMN title VARCHAR(100);
-- insert values into title column on employee table based on role_title
UPDATE employee SET title = 'Marketing Manager' WHERE role_id = 1;
UPDATE employee SET title = 'SEO Coordinator' WHERE role_id = 2;
UPDATE employee SET title = 'Software Developer' WHERE role_id = 3;
UPDATE employee SET title = 'Software Project Manager' WHERE role_id = 4;
UPDATE employee SET title = 'Computer Engineer' WHERE role_id = 5;
UPDATE employee SET title = 'Financial Analyst' WHERE role_id = 6;
UPDATE employee SET title = 'Recruiter' WHERE role_id = 7;
UPDATE employee SET title = 'HR Manager' WHERE role_id = 8;
UPDATE employee SET title = 'Finance Manager' WHERE role_id = 9;
alter table employee add column department VARCHAR(100);
-- insert values into department column on employee table based on role_id
UPDATE employee SET department = 'Marketing' WHERE role_id = 1;
UPDATE employee SET department = 'Marketing' WHERE role_id = 2;
UPDATE employee SET department = 'Software Development' WHERE role_id = 3;
UPDATE employee SET department = 'Project Management' WHERE role_id = 4;    
UPDATE employee SET department = 'Engineering' WHERE role_id = 5;
UPDATE employee SET department = 'Finance' WHERE role_id = 6;
UPDATE employee SET department = 'Human Resources' WHERE role_id = 7;
UPDATE employee SET department = 'Human Resources' WHERE role_id = 8;
UPDATE employee SET department = 'Finance' WHERE role_id = 9;
alter table employee add column salary DECIMAL;
alter table employee add column manager VARCHAR(100);
-- insert values into manager column on employee table based on manager_id
UPDATE employee SET manager = 'Shawn Booker' WHERE manager_id = 1;
UPDATE employee SET manager = 'Ryan Gayle' WHERE manager_id = 4;
UPDATE employee SET manager = 'Kyra Davis' WHERE manager_id = 8;
UPDATE employee SET manager = 'Derrick Jones' WHERE manager_id = 9;
-- insert values into salary column on employee table based on role_id
UPDATE employee SET salary = 80000 WHERE role_id = 1;
UPDATE employee SET salary = 55000 WHERE role_id = 2;
UPDATE employee SET salary = 100000 WHERE role_id = 3;
UPDATE employee SET salary = 135000 WHERE role_id = 4;
UPDATE employee SET salary = 115000 WHERE role_id = 5;
UPDATE employee SET salary = 90000 WHERE role_id = 6;
UPDATE employee SET salary = 70000 WHERE role_id = 7;
UPDATE employee SET salary = 85000 WHERE role_id = 8;
UPDATE employee SET salary = 120000 WHERE role_id = 9;
ALTER TABLE employee DROP COLUMN role_id;
ALTER TABLE employee DROP COLUMN manager_id;
select * from employee order by id ASC;
select * from employee;
select * from role;
select * from department;