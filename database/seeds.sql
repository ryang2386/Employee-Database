INSERT INTO department (id, name) VALUES
(1, 'Marketing'),
(2, 'Software Development'),
(3, 'Engineering'),
(4, 'Finance'),
(5, 'Human Resources'),
(6, 'Project Management');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Marketing Manager', 80000, 1),
(2, 'SEO Coordinator', 55000, 1),
(3, 'Software Developer', 100000, 2),
(4, 'Software Project Manager', 135000, 6),
(5, 'Computer Engineer', 115000, 3),
(6, 'Financial Analyst', 90000, 4),
(7, 'Recruiter', 70000, 5),
(8, 'HR Manager', 85000, 5),
(9, 'Finance Manager', 120000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Shawn', 'Booker', 1, NULL),
(2, 'Raul', 'Martinez', 2, 1),
(3, 'Elizabeth', 'Brown', 3, 4),
(4, 'Ryan', 'Gayle', 4, NULL),
(5, 'Andre', 'Johnson', 5, 4),
(6, 'Ashley', 'Smith', 6, 9),
(7, 'Mary', 'McNeal', 7, 8),
(8, 'Kyra', 'Davis', 8, NULL),
(9, 'Derrick', 'Jones', 9, NULL);


 



