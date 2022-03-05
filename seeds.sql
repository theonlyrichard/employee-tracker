use employees_db;

INSERT INTO department (name)

VALUES
("Information Systems"),
("Sales"),
("Engineer"),
("Finance"),
("Legal"),
("Human Resources"),
("Security");


INSERT INTO role (title, salary, department_id)
VALUES
("Accountant", 60000, 1),
("Sales Rep", 70000, 2),
("Engineer", 90000, 3),
("Attorney", 95000, 4),
("Manager" 65000, 5),
("Web Developer", 85000, 6);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES

("Richard", "Cardoza", 1, 10),
("Jose", "Garcia", 2, 20),
("Johny", "Boi", 3, 30),
("Stephanie", "Jones", 4, 40),
("Dwayne", "Johnson", 5, 50),
("Joe", "Rogan", 6, 60);

